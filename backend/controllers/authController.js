const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user exists
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  user = await User.create({
    name,
    email,
    password,
    role: role || 'technician',
  });

  const token = generateToken(user._id);

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide an email and password');
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// @desc    Get all users (admin only)
// @route   GET /api/auth/users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// @desc    Update a user (admin only)
// @route   PUT /api/auth/users/:id
exports.updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { name, email, role, password } = req.body;

  // Check email uniqueness
  if (email && email !== user.email) {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      throw new Error('Email already in use');
    }
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  if (password) user.password = password;

  user = await user.save();

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// @desc    Delete a user (admin only)
// @route   DELETE /api/auth/users/:id
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({ message: 'User removed' });
});
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