const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/tachograph_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
      id INT AUTO_INCREMENT PRIMARY KEY,
      numero VARCHAR(100) NOT NULL,
      vin VARCHAR(255),
      client VARCHAR(255),
      appareil VARCHAR(255),
      statut ENUM('Active','In Repair') DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS work_orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      camion VARCHAR(255),
      client VARCHAR(255),
      service VARCHAR(255),
      technicien VARCHAR(255),
      statut ENUM('Pending','In Progress','Completed') DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS invoices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      numero VARCHAR(100) NOT NULL,
      client VARCHAR(255),
      camion VARCHAR(255),
      montant VARCHAR(100),
      statut ENUM('Pending','Paid') DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS certificates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cert_id VARCHAR(100) NOT NULL,
      client VARCHAR(255),
      truck VARCHAR(255),
      date_issued DATE,
      expiration DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text_content VARCHAR(500) NOT NULL,
      time_label VARCHAR(100),
      is_read TINYINT(1) DEFAULT 0,
      type ENUM('info','warning','success') DEFAULT 'info',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(100) NOT NULL UNIQUE,
      setting_value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
  ];

  for (const q of queries) {
    await pool.query(q);
  }
  console.log('MySQL tables verified/created');
};

const getPool = () => pool;

module.exports = { connectDB, getPool };