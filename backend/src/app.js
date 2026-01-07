const express = require('express');
const cors = require('cors');
const statusRoutes = require('./routes/status');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment check
const environment = process.env.NODE_ENV || 'development';

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/health', (req, res) => {
  res.status(200).json({
    service: 'backend-api',
    status: 'running',
    environment: environment,
    timestamp: new Date().toISOString()
  });
});

app.use('/api', statusRoutes);

// Additional API endpoints can be added here

// Centralized error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
      timestamp: new Date().toISOString()
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = app;