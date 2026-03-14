const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

exports.getSettings = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT setting_key, setting_value FROM settings');
  const obj = {};
  rows.forEach((r) => { obj[r.setting_key] = r.setting_value; });
  res.json(obj);
});

exports.updateSettings = asyncHandler(async (req, res) => {
  const pool = getPool();
  const entries = Object.entries(req.body);
  for (const [key, value] of entries) {
    await pool.query(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [key, String(value), String(value)]
    );
  }
  // Return full settings
  const [rows] = await pool.query('SELECT setting_key, setting_value FROM settings');
  const obj = {};
  rows.forEach((r) => { obj[r.setting_key] = r.setting_value; });
  res.json(obj);
});
