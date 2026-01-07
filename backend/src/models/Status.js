// backend/src/models/Status.js
const db = require('../config/db');

// Create the statuses table if it doesn't exist
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS statuses (
      id SERIAL PRIMARY KEY,
      service_name VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      environment VARCHAR(50) NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await db.query(query);
    console.log('Statuses table created or already exists');
  } catch (err) {
    console.error('Error creating statuses table:', err);
  }
};

// Insert initial data
const insertInitialData = async () => {
  const query = `
    INSERT INTO statuses (service_name, status, environment) 
    VALUES ($1, $2, $3)
    ON CONFLICT DO NOTHING;
  `;
  
  try {
    await db.query(query, ['backend-api', 'running', 'development']);
    console.log('Initial status data inserted');
  } catch (err) {
    console.error('Error inserting initial data:', err);
  }
};

// Get all statuses
const getAllStatuses = async () => {
  const query = 'SELECT * FROM statuses ORDER BY timestamp DESC';
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error fetching statuses:', err);
    throw err;
  }
};

// Get the latest status
const getLatestStatus = async () => {
  const query = 'SELECT * FROM statuses ORDER BY timestamp DESC LIMIT 1';
  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching latest status:', err);
    throw err;
  }
};

// Initialize the table and insert initial data
createTable().then(() => {
  insertInitialData();
});

module.exports = {
  getAllStatuses,
  getLatestStatus,
};