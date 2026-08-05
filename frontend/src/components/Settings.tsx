import React from 'react';

interface SettingsProps {
  accentColor: string;
  setAccentColor: (color: string) => void;
  compactMode: boolean;
  setCompactMode: (isCompact: boolean) => void;
}

const COLORS = [
  { name: 'Ocean Blue', value: '#38bdf8' },
  { name: 'Emerald Green', value: '#10b981' },
  { name: 'Deep Purple', value: '#8b5cf6' },
  { name: 'Warning Orange', value: '#f59e0b' },
  { name: 'Rose Red', value: '#f43f5e' }
];

const Settings: React.FC<SettingsProps> = ({ accentColor, setAccentColor, compactMode, setCompactMode }) => {
  return (
    <div className="glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
      <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        Personalization Settings
      </h2>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Theme Accent Color</h3>
        <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Choose a primary color for the dashboard's buttons, icons, and highlights.</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => setAccentColor(color.value)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: color.value,
                border: accentColor === color.value ? '3px solid white' : 'none',
                cursor: 'pointer',
                boxShadow: accentColor === color.value ? `0 0 10px ${color.value}` : 'none',
                transition: 'all 0.2s ease'
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Layout Preferences</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Compact Mode</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reduces padding and font sizes to fit more data on screen.</span>
          </div>
          
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={compactMode} 
              onChange={(e) => setCompactMode(e.target.checked)} 
              style={{ width: '20px', height: '20px', accentColor: 'var(--accent-color)', cursor: 'pointer' }}
            />
            <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{compactMode ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
