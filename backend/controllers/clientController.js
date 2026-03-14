const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

// @desc    Get all clients
// @route   GET /api/clients
exports.getClients = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM clients ORDER BY id DESC');
  res.json(rows);
});

// @desc    Create a client
// @route   POST /api/clients
exports.createClient = asyncHandler(async (req, res) => {
  const { nom, telephone, entreprise, email } = req.body;
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO clients (nom, telephone, entreprise, email) VALUES (?, ?, ?, ?)',
    [nom, telephone, entreprise, email]
  );
  const [rows] = await pool.query('SELECT * FROM clients WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

// @desc    Update client
// @route   PUT /api/clients/:id
exports.updateClient = asyncHandler(async (req, res) => {
  const { nom, telephone, entreprise, email } = req.body;
  const pool = getPool();
  await pool.query(
    'UPDATE clients SET nom=?, telephone=?, entreprise=?, email=? WHERE id=?',
    [nom, telephone, entreprise, email, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
  if (rows.length === 0) { res.status(404); throw new Error('Client not found'); }
  res.json(rows[0]);
});

// @desc    Delete client
// @route   DELETE /api/clients/:id
exports.deleteClient = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) { res.status(404); throw new Error('Client not found'); }
  res.json({ message: 'Client removed' });
});