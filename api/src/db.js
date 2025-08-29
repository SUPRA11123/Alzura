import mysql from 'mysql2/promise';

const pool = await mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'autengo_demo',
  waitForConnections: true,
  connectionLimit: 10
});

export async function init() {
  const sql = `CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(64) NOT NULL,
    model VARCHAR(64) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  await pool.query(sql);
}

export default pool;
