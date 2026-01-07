-- Create the statuses table
CREATE TABLE IF NOT EXISTS statuses (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  environment VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO statuses (service_name, status, environment) 
VALUES 
  ('backend-api', 'running', 'production'),
  ('frontend-app', 'running', 'production'),
  ('database', 'running', 'production')
ON CONFLICT DO NOTHING;