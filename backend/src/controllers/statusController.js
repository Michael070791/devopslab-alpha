const { getLatestStatus } = require('../models/Status');

const getStatus = async (req, res) => {
  try {
    const latestStatus = await getLatestStatus();

    if (latestStatus) {
      res.status(200).json({
        service: latestStatus.service_name,
        status: latestStatus.status,
        environment: latestStatus.environment,
        timestamp: latestStatus.timestamp
      });
    } else {
      // Fallback if no data in database
      const environment = process.env.NODE_ENV || 'development';
      res.status(200).json({
        service: 'backend-api',
        status: 'running',
        environment: environment,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({
      error: 'Failed to fetch status'
    });
  }
};

const getInfo = (req, res) => {
  const environment = process.env.NODE_ENV || 'development';
  const version = process.env.npm_package_version || '1.0.0';

  res.status(200).json({
    name: 'DevOpsLab Backend API',
    version: version,
    environment: environment,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};

module.exports = {
  getStatus,
  getInfo
};