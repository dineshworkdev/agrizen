import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { Globe, Check, Volume2, ChevronLeft } from 'lucide-react';

export function FarmerLanguage() {
  const { language, setLanguage, setFarmerScreen, playChime } = useAgrizen();

  const handleSelect = (code) => {
    setLanguage(code);
    playChime();
    setFarmerScreen('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">Bhashini AI Voice</span>
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--gov-slate-900)' }}>
          Select Language / மொழியை தேர்வு செய்க
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Choose your native language for voice announcements and token alerts.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { code: 'en', native: 'English', english: 'English', desc: 'Government of Tamil Nadu Official Interface' },
          { code: 'ta', native: 'தமிழ்', english: 'Tamil', desc: 'தமிழ்நாடு நுகர்பொருள் வாணிபக் கழக நேரலை வரிசை' },
          { code: 'hi', native: 'हिन्दी', english: 'Hindi', desc: 'राष्ट्रीय कृषि खरीद एवं कतार प्रबंधन' }
        ].map(item => {
          const isSelected = language === item.code;
          return (
            <div
              key={item.code}
              className="gov-card gov-card-interactive"
              onClick={() => handleSelect(item.code)}
              style={{
                border: isSelected ? '2px solid var(--gov-green-700)' : '1px solid var(--gov-border)',
                backgroundColor: isSelected ? 'var(--gov-green-50)' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
                    {item.native}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gov-slate-500)' }}>
                    ({item.english})
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)', marginTop: '3px' }}>
                  {item.desc}
                </div>
              </div>

              {isSelected && (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gov-green-700)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={18} strokeWidth={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
