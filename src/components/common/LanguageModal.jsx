import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { Check, Globe, Volume2, X } from 'lucide-react';

export function LanguageModal({ isOpen, onClose }) {
  const { language, setLanguage, playChime } = useAgrizen();

  if (!isOpen) return null;

  const languages = [
    {
      code: 'en',
      name: 'English',
      native: 'English',
      subtext: 'Default National Interface',
      audioHint: 'Welcome to Agrizen'
    },
    {
      code: 'ta',
      name: 'Tamil',
      native: 'தமிழ்',
      subtext: 'தமிழ்நாடு அரசு நுகர்பொருள் வாணிபக் கழகம்',
      audioHint: 'அக்ரிஜென் உங்களை வரவேற்கிறது'
    },
    {
      code: 'hi',
      name: 'Hindi',
      native: 'हिन्दी',
      subtext: 'राष्ट्रीय कृषि खरीद एवं कतार प्रबंधन',
      audioHint: 'एग्रीज़ेन में आपका स्वागत है'
    }
  ];

  const handleSelect = (code) => {
    setLanguage(code);
    playChime();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="lang-modal-title">
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--gov-green-700)" />
            <h3 id="lang-modal-title" style={{ fontSize: '1.05rem' }}>Select Language / மொழியை தேர்ந்தெடுக்கவும்</h3>
          </div>
          <button className="gov-btn-ghost gov-btn-sm" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {languages.map((l) => {
            const isSelected = language === l.code;
            return (
              <div
                key={l.code}
                onClick={() => handleSelect(l.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected ? '2px solid var(--gov-green-700)' : '1px solid var(--gov-border)',
                  backgroundColor: isSelected ? 'var(--gov-green-50)' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
                      {l.native}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gov-slate-500)', fontWeight: 500 }}>
                      ({l.name})
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
                    {l.subtext}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isSelected && (
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--gov-green-700)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
