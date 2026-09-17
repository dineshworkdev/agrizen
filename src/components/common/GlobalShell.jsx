import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { LanguageModal } from './LanguageModal';
import {
  Users,
  ShieldCheck,
  Building2,
  Globe,
  Bell,
  Play,
  CloudRain,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export function GlobalShell({ children }) {
  const {
    role,
    setRole,
    language,
    t,
    toasts,
    removeToast,
    callNextToken,
    toggleWeatherDelay,
    isDelaySimulated,
    resetDemoData,
    activeCentre
  } = useAgrizen();

  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <div className="agrizen-app-shell">
      {/* Subtle National Tricolor Strip */}
      <div className="gov-tricolor-bar" />

      {/* Top Global Portal Bar & Role Switcher */}
      <header className="global-portal-bar">
        <div className="global-portal-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 700,
              color: '#f8fafc'
            }}>
              🇮🇳 AGRIZEN
            </span>
            <span style={{ color: 'var(--gov-slate-600)' }}>|</span>
            <span style={{ color: 'var(--gov-slate-300)', fontSize: '0.74rem' }}>
              National Agricultural Procurement & Queue System
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Role Switcher Pill Group */}
            <div className="role-switcher-pill-group" role="group" aria-label="Switch User Portal">
              <button
                className={`role-pill-btn ${role === 'farmer' ? 'active' : ''}`}
                onClick={() => setRole('farmer')}
                title="Switch to Farmer Interface"
              >
                <Users size={12} />
                <span>Farmer</span>
              </button>
              <button
                className={`role-pill-btn ${role === 'staff' ? 'active' : ''}`}
                onClick={() => setRole('staff')}
                title="Switch to DPC Centre Staff Operations"
              >
                <Building2 size={12} />
                <span>Centre Staff</span>
              </button>
              <button
                className={`role-pill-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => setRole('admin')}
                title="Switch to National & State Admin"
              >
                <ShieldCheck size={12} />
                <span>Admin</span>
              </button>
            </div>

            {/* Language Selector Button */}
            <button
              className="gov-btn-ghost gov-btn-sm"
              onClick={() => setIsLangOpen(true)}
              style={{ color: '#cbd5e1', padding: '3px 8px', fontSize: '0.75rem', border: '1px solid var(--gov-slate-800)' }}
              title="Change Language"
            >
              <Globe size={13} />
              <span>{language === 'en' ? 'English' : language === 'ta' ? 'தமிழ்' : 'हिन्दी'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Role Content */}
      <main>
        {children}
      </main>

      {/* Floating Demo Control Dock (For Hackathon Reviewers & Evaluation) */}
      <aside className="demo-simulation-bar" aria-label="Demo Simulator Controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#f59e0b" />
          <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#f8fafc' }}>
            DEMO ENGINE:
          </span>
        </div>

        <button
          className="demo-chip"
          onClick={() => callNextToken("CTR-03")}
          title="Simulate calling the next token at Counter 3 (Advances live queue)"
        >
          <Play size={12} />
          <span>Call Next Token</span>
        </button>

        <button
          className={`demo-chip ${isDelaySimulated ? 'active' : ''}`}
          onClick={toggleWeatherDelay}
          title="Simulate rain cloud cover & dampness buffer (+15 min)"
        >
          <CloudRain size={12} />
          <span>{isDelaySimulated ? 'Clear Weather Delay' : 'Simulate Rain Delay'}</span>
        </button>

        <button
          className="demo-chip"
          onClick={resetDemoData}
          title="Reset all tokens, counters, and queues to default state"
        >
          <RotateCcw size={12} />
          <span>Reset Queues</span>
        </button>
      </aside>

      {/* Accessible Language Selection Modal */}
      <LanguageModal isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />

      {/* Live Toast Container */}
      <div className="toast-container" aria-live="polite">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {toast.type === 'success' && <CheckCircle2 size={16} color="#4ade80" />}
              {toast.type === 'warning' && <AlertTriangle size={16} color="#f59e0b" />}
              {toast.type === 'info' && <Info size={16} color="#38bdf8" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
              aria-label="Dismiss toast"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
