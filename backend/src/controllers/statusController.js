const getStatus = (req, res) => {
  const environment = process.env.NODE_ENV || 'development';
  
  res.status(200).json({
    service: 'backend-api',
    status: 'running',
    environment: environment,
    timestamp: new Date().toISOString()
  });
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