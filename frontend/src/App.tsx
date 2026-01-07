import { useState, useEffect } from 'react';
import './App.css';
import { apiClient } from './api/api';

interface BackendStatus {
  service: string;
  status: string;
  environment: string;
  timestamp: string;
}

function App() {
  const [status, setStatus] = useState<BackendStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.get('/api/status');
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>DevOpsLab Alpha Dashboard</h1>
      </header>

      <main className="main-content">
        <div className="status-card">
          <h2>Backend Status</h2>

          {loading && <p>Loading...</p>}

          {error && (
            <div className="error">
              <p>Error: {error}</p>
            </div>
          )}

          {status && !error && !loading && (
            <div className="status-info">
              <p><strong>Service:</strong> {status.service}</p>
              <p><strong>Status:</strong> {status.status}</p>
              <p><strong>Environment:</strong> {status.environment}</p>
              <p><strong>Timestamp:</strong> {new Date(status.timestamp).toLocaleString()}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App
