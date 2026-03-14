const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

exports.getWorkOrders = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM work_orders ORDER BY id DESC');
  res.json(rows);
});

exports.createWorkOrder = asyncHandler(async (req, res) => {
  const { camion, client, service, technicien, statut } = req.body;
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO work_orders (camion, client, service, technicien, statut) VALUES (?, ?, ?, ?, ?)',
    [camion, client, service, technicien, statut || 'Pending']
  );
  const [rows] = await pool.query('SELECT * FROM work_orders WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

exports.updateWorkOrder = asyncHandler(async (req, res) => {
  const { camion, client, service, technicien, statut } = req.body;
  const pool = getPool();
  await pool.query(
    'UPDATE work_orders SET camion=?, client=?, service=?, technicien=?, statut=? WHERE id=?',
    [camion, client, service, technicien, statut, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM work_orders WHERE id = ?', [req.params.id]);
  if (rows.length === 0) { res.status(404); throw new Error('Work order not found'); }
  res.json(rows[0]);
});

exports.deleteWorkOrder = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [result] = await pool.query('DELETE FROM work_orders WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) { res.status(404); throw new Error('Work order not found'); }
  res.json({ message: 'Work order removed' });
});