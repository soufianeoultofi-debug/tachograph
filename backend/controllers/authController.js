const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const pool = getPool();

  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashed, role || 'technician']
  );

  res.status(201).json({
    id: result.insertId,
    name,
    email,
    role: role || 'technician',
    token: generateToken(result.insertId),
  });
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const pool = getPool();

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user.id),
  });
});

// @desc    Get all users (admin only)
// @route   GET /api/auth/users
exports.getUsers = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY id');
  res.json(rows);
});

// @desc    Update a user (admin only)
// @route   PUT /api/auth/users/:id
exports.updateUser = asyncHandler(async (req, res) => {
  const pool = getPool();
  const { name, email, role, password } = req.body;
  const userId = req.params.id;

  // Check user exists
  const [existing] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
  if (existing.length === 0) {
    res.status(404);
    throw new Error('User not found');
  }

  // Check email uniqueness (excluding current user)
  if (email) {
    const [dup] = await pool.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
    if (dup.length > 0) {
      res.status(400);
      throw new Error('Email already in use');
    }
  }

  // Build dynamic update
  const fields = [];
  const values = [];
  if (name) { fields.push('name = ?'); values.push(name); }
  if (email) { fields.push('email = ?'); values.push(email); }
  if (role) { fields.push('role = ?'); values.push(role); }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    fields.push('password = ?');
    values.push(hashed);
  }

  if (fields.length === 0) {
    res.status(400);
    throw new Error('No fields to update');
  }

  values.push(userId);
  await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);

  const [updated] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [userId]);
  res.json(updated[0]);
});

// @desc    Delete a user (admin only)
// @route   DELETE /api/auth/users/:id
exports.deleteUser = asyncHandler(async (req, res) => {
  const pool = getPool();
  const userId = req.params.id;

  // Prevent deleting yourself
  if (parseInt(userId) === req.user.id) {
    res.status(400);
    throw new Error('Cannot delete your own account');
  }

  const [existing] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
  if (existing.length === 0) {
    res.status(404);
    throw new Error('User not found');
  }

  await pool.query('DELETE FROM users WHERE id = ?', [userId]);
  res.json({ message: 'User deleted' });
});