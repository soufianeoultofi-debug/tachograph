const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

exports.getTrucks = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM trucks ORDER BY id DESC');
  res.json(rows);
});

exports.createTruck = asyncHandler(async (req, res) => {
  const { numero, vin, client, appareil, statut } = req.body;
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO trucks (numero, vin, client, appareil, statut) VALUES (?, ?, ?, ?, ?)',
    [numero, vin, client, appareil, statut || 'Active']
  );
  const [rows] = await pool.query('SELECT * FROM trucks WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

exports.updateTruck = asyncHandler(async (req, res) => {
  const { numero, vin, client, appareil, statut } = req.body;
  const pool = getPool();
  await pool.query(
    'UPDATE trucks SET numero=?, vin=?, client=?, appareil=?, statut=? WHERE id=?',
    [numero, vin, client, appareil, statut, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM trucks WHERE id = ?', [req.params.id]);
  if (rows.length === 0) { res.status(404); throw new Error('Truck not found'); }
  res.json(rows[0]);
});

exports.deleteTruck = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [result] = await pool.query('DELETE FROM trucks WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) { res.status(404); throw new Error('Truck not found'); }
  res.json({ message: 'Truck removed' });
});