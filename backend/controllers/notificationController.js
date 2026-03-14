const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

exports.getNotifications = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM notifications ORDER BY id DESC');
  res.json(rows);
});

exports.createNotification = asyncHandler(async (req, res) => {
  const { text_content, time_label, type } = req.body;
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO notifications (text_content, time_label, is_read, type) VALUES (?, ?, 0, ?)',
    [text_content, time_label || 'À l\'instant', type || 'info']
  );
  const [rows] = await pool.query('SELECT * FROM notifications WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

exports.markRead = asyncHandler(async (req, res) => {
  const pool = getPool();
  await pool.query('UPDATE notifications SET is_read = 1 WHERE id = ?', [req.params.id]);
  res.json({ message: 'Marked as read' });
});

exports.markAllRead = asyncHandler(async (req, res) => {
  const pool = getPool();
  await pool.query('UPDATE notifications SET is_read = 1');
  res.json({ message: 'All marked as read' });
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [result] = await pool.query('DELETE FROM notifications WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) { res.status(404); throw new Error('Notification not found'); }
  res.json({ message: 'Notification removed' });
});
