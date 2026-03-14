const asyncHandler = require('express-async-handler');
const { getPool } = require('../config/db');

exports.getReports = asyncHandler(async (req, res) => {
  const pool = getPool();

  const [[revRow]] = await pool.query('SELECT IFNULL(SUM(montant), 0) AS revenue FROM invoices');
  const [[countRow]] = await pool.query('SELECT COUNT(*) AS total FROM work_orders');

  const [monthlyStats] = await pool.query(
    `SELECT DATE_FORMAT(created_at, '%Y-%m') AS _id, COUNT(*) AS count,
            IFNULL(SUM(i.montant), 0) AS revenue
     FROM work_orders w
     LEFT JOIN invoices i ON i.client = w.client
     GROUP BY _id ORDER BY _id`
  );

  const [statusCounts] = await pool.query(
    'SELECT statut AS _id, COUNT(*) AS count FROM work_orders GROUP BY statut'
  );

  res.json({
    totalRevenue: revRow.revenue,
    totalRepairs: countRow.total,
    monthlyStats,
    statusCounts,
  });
});