const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

exports.getInvoices = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM invoices ORDER BY id DESC');
  res.json(rows);
});

exports.createInvoice = asyncHandler(async (req, res) => {
  const { numero, client, camion, montant, statut } = req.body;
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO invoices (numero, client, camion, montant, statut) VALUES (?, ?, ?, ?, ?)',
    [numero, client, camion, montant, statut || 'Pending']
  );
  const [rows] = await pool.query('SELECT * FROM invoices WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

exports.updateInvoice = asyncHandler(async (req, res) => {
  const { numero, client, camion, montant, statut } = req.body;
  const pool = getPool();
  await pool.query(
    'UPDATE invoices SET numero=?, client=?, camion=?, montant=?, statut=? WHERE id=?',
    [numero, client, camion, montant, statut, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM invoices WHERE id = ?', [req.params.id]);
  if (rows.length === 0) { res.status(404); throw new Error('Invoice not found'); }
  res.json(rows[0]);
});

exports.deleteInvoice = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [result] = await pool.query('DELETE FROM invoices WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) { res.status(404); throw new Error('Invoice not found'); }
  res.json({ message: 'Invoice removed' });
});
