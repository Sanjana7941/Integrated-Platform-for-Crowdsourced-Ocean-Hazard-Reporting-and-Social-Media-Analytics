import { useEffect, useState } from 'react';
import { ShieldAlert, BarChart3, Map, Settings, Search } from 'lucide-react';
import HazardMap from './components/HazardMap';
import ReportForm from './components/ReportForm';
import AnalyticsCharts from './components/AnalyticsCharts';
import SocialFeed from './components/SocialFeed';
import { fetchReports } from './api';

function App() {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReports = async () => {
    setIsLoading(true);
    const data = await fetchReports();
    setReports(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand">
          <ShieldAlert size={28} />
          OceanGuard
        </div>
        
        <nav className="nav-links">
          <a className="nav-link active">
            <Map size={20} />
            Live Map
          </a>
          <a className="nav-link">
            <BarChart3 size={20} />
            Analytics
          </a>
          <a className="nav-link">
            <Search size={20} />
            Historical Data
          </a>
          <a className="nav-link">
            <Settings size={20} />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header>
          <h1>Ocean Hazard Dashboard</h1>
          <p>Real-time crowdsourced reporting and social media insights.</p>
        </header>

        {/* Top Stats */}
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="glass-panel">
            <h3>Active Hazards</h3>
            <div className="stat-value">{reports.length}</div>
            <p>Reported in the last 24h</p>
          </div>
          <div className="glass-panel">
            <h3>Social Mentions</h3>
            <div className="stat-value">1,204</div>
            <p>Across Twitter & Reddit</p>
          </div>
          <div className="glass-panel">
            <h3>High Severity</h3>
            <div className="stat-value" style={{ color: 'var(--danger-color)' }}>
              {reports.filter(r => r.severity === 'High').length}
            </div>
            <p>Immediate action required</p>
          </div>
        </div>

        {/* Analytics & Social Feed */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <h2 style={{ marginBottom: '16px' }}>Data Analytics</h2>
            {isLoading ? <div>Loading analytics...</div> : <AnalyticsCharts reports={reports} />}
          </div>
          <div>
            <h2 style={{ marginBottom: '16px' }}>Social Media Pulse</h2>
            <SocialFeed />
          </div>
        </div>

        {/* Main interactive area (Map & Form) */}
        <div className="dashboard-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ flex: 1 }}>
              <h2>Global Map</h2>
              <p style={{ marginBottom: '16px' }}>Interactive view of all reported incidents.</p>
              {isLoading ? (
                <div>Loading map data...</div>
              ) : (
                <HazardMap reports={reports} />
              )}
            </div>
          </div>
          
          <div>
            <ReportForm onReportAdded={loadReports} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
