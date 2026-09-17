import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Fingerprint
} from 'lucide-react';

export function StaffLogin() {
  const { setStaffScreen, addToast, playChime } = useAgrizen();
  const [employeeId, setEmployeeId] = useState("TN-CSC-EMP-8812");
  const [pin, setPin] = useState("8812");

  const handleSubmit = (e) => {
    e.preventDefault();
    playChime();
    addToast("Staff authorized: K. Sundaram, Agricultural Officer", "success");
    setStaffScreen('dashboard');
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
          <Building2 size={28} color="#86efac" />
        </div>
        <h2 style={{ fontSize: '1.45rem', color: 'var(--gov-slate-900)' }}>
          DPC Centre Staff Login
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Tamil Nadu Civil Supplies Corporation • Counter Operations Portal
        </p>
      </div>

      <div className="gov-card">
        <form onSubmit={handleSubmit}>
          <div className="gov-form-group">
            <label className="gov-label" htmlFor="emp-id">Employee Staff ID</label>
            <input
              id="emp-id"
              type="text"
              className="gov-input mono"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="e.g. TN-CSC-EMP-8812"
            />
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="staff-pin">Security PIN / Passcode</label>
            <input
              id="staff-pin"
              type="password"
              className="gov-input mono"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
            />
          </div>

          <button
            type="submit"
            className="gov-btn gov-btn-primary gov-btn-lg"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <span>Login to DPC Operations Desk</span>
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
          <Fingerprint size={18} color="var(--gov-green-700)" />
          <span>Biometric e-Attendance Linked Session</span>
        </div>
      </div>
    </div>
  );
}
