import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Settings,
  Globe,
  Bell,
  Volume2,
  Eye,
  DownloadCloud,
  ChevronLeft,
  Check
} from 'lucide-react';

export function FarmerSettings() {
  const { language, setLanguage, setFarmerScreen, addToast, playChime } = useAgrizen();

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [audioChimes, setAudioChimes] = useState(true);
  const [offlineCache, setOfflineCache] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const handleSave = () => {
    playChime();
    addToast("Preferences saved to local device cache", "success");
    setFarmerScreen('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-slate">Preferences</span>
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gov-slate-900)' }}>
          Settings & Accessibility
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Configure offline access, audio alerts, and language preferences.
        </p>
      </div>

      {/* Language Section */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
          <Globe size={18} color="var(--gov-green-700)" />
          <h4 style={{ fontSize: '0.95rem' }}>Preferred Interface Language</h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[
            { code: 'en', label: 'English' },
            { code: 'ta', label: 'தமிழ்' },
            { code: 'hi', label: 'हिन्दी' }
          ].map(l => (
            <button
              key={l.code}
              type="button"
              className={`gov-btn ${language === l.code ? 'gov-btn-primary' : 'gov-btn-secondary'} gov-btn-sm`}
              onClick={() => {
                setLanguage(l.code);
                playChime();
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Toggles */}
      <div className="gov-card">
        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.85rem' }}>Alerts & Chimes</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>SMS Queue Alerts</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--gov-slate-500)' }}>Receive text message when 2 tokens away</div>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Audio Turn Chimes</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--gov-slate-500)' }}>Play chime when next token is called</div>
            </div>
            <input
              type="checkbox"
              checked={audioChimes}
              onChange={(e) => setAudioChimes(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Offline E-Pass Caching</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--gov-slate-500)' }}>Show QR code even without cellular signal at rural yard</div>
            </div>
            <input
              type="checkbox"
              checked={offlineCache}
              onChange={(e) => setOfflineCache(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </label>
        </div>
      </div>

      <button className="gov-btn gov-btn-primary" onClick={handleSave}>
        <span>Save Preferences</span>
      </button>
    </div>
  );
}
