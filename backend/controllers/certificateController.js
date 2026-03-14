const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

exports.getCertificates = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM certificates ORDER BY id DESC');
  res.json(rows);
});

exports.createCertificate = asyncHandler(async (req, res) => {
  const { cert_id, client, truck, date_issued, expiration } = req.body;
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO certificates (cert_id, client, truck, date_issued, expiration) VALUES (?, ?, ?, ?, ?)',
    [cert_id, client, truck, date_issued, expiration]
  );
  const [rows] = await pool.query('SELECT * FROM certificates WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

exports.updateCertificate = asyncHandler(async (req, res) => {
  const { cert_id, client, truck, date_issued, expiration } = req.body;
  const pool = getPool();
  await pool.query(
    'UPDATE certificates SET cert_id=?, client=?, truck=?, date_issued=?, expiration=? WHERE id=?',
    [cert_id, client, truck, date_issued, expiration, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM certificates WHERE id = ?', [req.params.id]);
  if (rows.length === 0) { res.status(404); throw new Error('Certificate not found'); }
  res.json(rows[0]);
});

exports.deleteCertificate = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [result] = await pool.query('DELETE FROM certificates WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) { res.status(404); throw new Error('Certificate not found'); }
  res.json({ message: 'Certificate removed' });
});