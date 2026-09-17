import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  User,
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  LogOut,
  ChevronLeft
} from 'lucide-react';

export function StaffProfile() {
  const { activeCentre, setStaffScreen, addToast, playChime } = useAgrizen();

  const handleLogout = () => {
    playChime();
    addToast("Logged out from Centre Staff Operations Desk", "info");
    setStaffScreen('login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setStaffScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">Gazetted Officer</span>
      </div>

      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--gov-slate-900)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            fontWeight: 800
          }}>
            KS
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--gov-slate-900)' }}>
              {activeCentre.supervisor.name}
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--gov-slate-600)' }}>
              {activeCentre.supervisor.tamilName}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
              Staff ID: <span className="mono">{activeCentre.supervisor.staffId}</span> • Designation: Agricultural Officer (AO)
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--gov-border)',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Assigned Centre</span>
            <strong>{activeCentre.name} ({activeCentre.code})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Official Mobile</span>
            <strong>{activeCentre.supervisor.mobile}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Govt Email</span>
            <strong className="mono">{activeCentre.supervisor.email}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Department</span>
            <strong>Tamil Nadu Civil Supplies Corporation (TNCSC)</strong>
          </div>
        </div>
      </div>

      <button
        className="gov-btn gov-btn-secondary"
        onClick={handleLogout}
        style={{ color: 'var(--gov-earth-700)', borderColor: 'var(--gov-earth-100)' }}
      >
        <LogOut size={16} />
        <span>Log Out of Staff Session</span>
      </button>
    </div>
  );
}
