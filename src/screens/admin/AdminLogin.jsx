import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  KeyRound
} from 'lucide-react';

export function AdminLogin() {
  const { setAdminScreen, addToast, playChime } = useAgrizen();
  const [govEmail, setGovEmail] = useState("tncsc.stateadmin@tn.gov.in");
  const [password, setPassword] = useState("••••••••");

  const handleSubmit = (e) => {
    e.preventDefault();
    playChime();
    addToast("State Admin SSO Authenticated: Tamil Nadu Civil Supplies HQ", "success");
    setAdminScreen('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '440px', margin: '2rem auto 0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--gov-slate-900)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px auto',
          boxShadow: 'var(--gov-shadow-md)'
        }}>
          <ShieldCheck size={28} color="#f59e0b" />
        </div>
        <h2 style={{ fontSize: '1.45rem', color: 'var(--gov-slate-900)' }}>
          State Admin Portal
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Government of Tamil Nadu • Dept. of Food &amp; Consumer Protection
        </p>
      </div>

      <div className="gov-card">
        <form onSubmit={handleSubmit}>
          <div className="gov-form-group">
            <label className="gov-label" htmlFor="admin-email">Gov SSO Email Address</label>
            <input
              id="admin-email"
              type="email"
              className="gov-input"
              required
              value={govEmail}
              onChange={(e) => setGovEmail(e.target.value)}
              placeholder="name@tn.gov.in"
            />
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="admin-pwd">Security Password</label>
            <input
              id="admin-pwd"
              type="password"
              className="gov-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="gov-btn gov-btn-primary gov-btn-lg"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <span>Authenticate National &amp; State SSO</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--gov-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'var(--gov-slate-600)',
          fontSize: '0.82rem'
        }}>
          <Lock size={16} color="var(--gov-slate-400)" />
          <span>Restricted to Authorized Civil Supplies Commissioners</span>
        </div>
      </div>
    </div>
  );
}
