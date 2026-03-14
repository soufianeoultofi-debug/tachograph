const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

(async () => {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tachograph_db',
  });

  // Remove existing admin user if any
  await pool.query("DELETE FROM users WHERE email = 'admin'");

  // Hash password
  const hashed = await bcrypt.hash('admin', 10);

  // Insert admin
  const [r] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ['Admin', 'admin', hashed, 'admin']
  );
  console.log('Admin user created, id:', r.insertId);

  // Show all users
  const [rows] = await pool.query('SELECT id, name, email, role FROM users');
  console.log('All users:', JSON.stringify(rows, null, 2));

  await pool.end();
})();
