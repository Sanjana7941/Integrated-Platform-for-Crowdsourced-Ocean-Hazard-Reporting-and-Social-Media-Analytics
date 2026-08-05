import React from 'react';

const mockMentions = [
  { id: 1, platform: 'Twitter', user: '@ocean_watcher', text: 'Large algal bloom spotted off the coast of Florida! #OceanHazard', time: '10m ago' },
  { id: 2, platform: 'Reddit', user: 'u/marine_biologist', text: 'Has anyone else noticed the abnormal coral bleaching in the Pacific recently?', time: '1h ago' },
  { id: 3, platform: 'Twitter', user: '@coastguard_alerts', text: '⚠️ Oil spill contained near sector 4. Cleanup crews dispatched.', time: '2h ago' },
  { id: 4, platform: 'Twitter', user: '@eco_warrior', text: 'Plastic pollution levels reaching dangerous highs near the bay.', time: '5h ago' },
];

const SocialFeed: React.FC = () => {
  return (
    <div className="glass-panel" style={{ height: '400px', overflowY: 'auto' }}>
      <h3 style={{ marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        Live Social Feed
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mockMentions.map(mention => (
          <div key={mention.id} style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: mention.platform === 'Twitter' ? '#38bdf8' : '#ff4500' }}>
                {mention.user} ({mention.platform})
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{mention.time}</span>
            </div>
            <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-main)' }}>{mention.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
