import { useEffect, useState } from 'react';
import { ShieldAlert, BarChart3, Map, Settings as SettingsIcon, Search } from 'lucide-react';
import HazardMap from './components/HazardMap';
import ReportForm from './components/ReportForm';
import AnalyticsCharts from './components/AnalyticsCharts';
import SocialFeed from './components/SocialFeed';
import Settings from './components/Settings';
import { fetchReports } from './api';

function App() {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Personalization State (loaded from localStorage if available)
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('oceanGuardAccentColor') || '#38bdf8');
  const [compactMode, setCompactMode] = useState(() => localStorage.getItem('oceanGuardCompactMode') === 'true');

  // Fetch reports on mount
  const loadReports = async () => {
    setIsLoading(true);
    const data = await fetchReports();
    setReports(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  // Apply CSS variables and classes whenever settings change
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    localStorage.setItem('oceanGuardAccentColor', accentColor);
    
    if (compactMode) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
    localStorage.setItem('oceanGuardCompactMode', compactMode.toString());
  }, [accentColor, compactMode]);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand">
          <ShieldAlert size={28} style={{ color: 'var(--accent-color)' }} />
          OceanGuard
        </div>
        
        <nav className="nav-links">
          <a 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 size={20} />
            Dashboard
          </a>
          <a 
            className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <Map size={20} />
            Live Map & Reporting
          </a>
          <a 
            className={`nav-link ${activeTab === 'historical' ? 'active' : ''}`}
            onClick={() => setActiveTab('historical')}
          >
            <Search size={20} />
            Historical Data
          </a>
          <a 
            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <SettingsIcon size={20} />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header>
          <h1>Ocean Hazard Platform</h1>
          <p>Real-time crowdsourced reporting and social media insights.</p>
        </header>

        {/* Top Stats - Always visible unless in settings */}
        {activeTab !== 'settings' && (
          <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="glass-panel">
              <h3>Active Hazards</h3>
              <div className="stat-value" style={{ color: 'var(--accent-color)' }}>{reports.length}</div>
              <p>Reported in the last 24h</p>
            </div>
            <div className="glass-panel">
              <h3>Social Mentions</h3>
              <div className="stat-value" style={{ color: 'var(--accent-color)' }}>1,204</div>
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
        )}

        {/* Dynamic Views based on activeTab */}
        {activeTab === 'dashboard' && (
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
        )}

        {activeTab === 'map' && (
          <div className="dashboard-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ flex: 1 }}>
                <h2>Global Hazard Map</h2>
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
        )}

        {activeTab === 'historical' && (
          <div className="glass-panel">
            <h2>Historical Data</h2>
            <p>This feature is currently under development. Please check back later to view historical archives and trends.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Settings 
              accentColor={accentColor} 
              setAccentColor={setAccentColor} 
              compactMode={compactMode} 
              setCompactMode={setCompactMode} 
            />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
