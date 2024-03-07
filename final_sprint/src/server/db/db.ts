import mysql, { Pool } from 'mysql2';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'your_default_database_name',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
  

const query = promisify(pool.query).bind(pool);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database!');
    connection.release();
  }
});

export { query };
