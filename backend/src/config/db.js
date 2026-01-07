const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Database connection configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'devopslab',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
};

// Create a connection pool
const pool = new Pool(dbConfig);

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};