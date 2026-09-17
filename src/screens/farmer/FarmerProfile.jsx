import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  User,
  ShieldCheck,
  Building2,
  Wheat,
  CreditCard,
  FileText,
  MapPin,
  Calendar,
  LogOut,
  CheckCircle2
} from 'lucide-react';

export function FarmerProfile() {
  const { currentUser, setFarmerScreen, addToast, playChime } = useAgrizen();

  const handleLogout = () => {
    playChime();
    addToast("Logged out of Farmer Portal", "info");
    setFarmerScreen('login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Profile Header Card */}
      <div className="gov-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--gov-green-700)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          fontWeight: 800,
          flexShrink: 0
        }}>
          {currentUser.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gov-slate-900)' }}>
              {currentUser.name}
            </h3>
            <span className="gov-badge gov-badge-green" style={{ fontSize: '0.68rem' }}>
              <ShieldCheck size={12} />
              VERIFIED
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
            {currentUser.tamilName} • Farmer ID: <span className="mono">{currentUser.id}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
            Registered on {currentUser.registeredDate}
          </div>
        </div>
      </div>

      {/* Direct Benefit Transfer (DBT) Bank Account Status */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--gov-green-700)" />
            <h4 style={{ fontSize: '0.95rem' }}>Aadhaar-Linked DBT Bank Account</h4>
          </div>
          <span className="gov-badge gov-badge-green" style={{ fontSize: '0.68rem' }}>
            NPCI Active
          </span>
        </div>

        <div style={{ backgroundColor: 'var(--gov-slate-50)', padding: '0.9rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gov-slate-500)' }}>Bank Name</span>
            <strong style={{ fontSize: '0.88rem' }}>{currentUser.bankDetails.bankName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gov-slate-500)' }}>Account Number</span>
            <strong className="mono tabular-nums">{currentUser.bankDetails.accountNumberMasked}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gov-slate-500)' }}>IFSC Code</span>
            <strong className="mono">{currentUser.bankDetails.ifsc}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gov-slate-500)' }}>Aadhaar Seeding</span>
            <span style={{ color: 'var(--gov-green-800)', fontWeight: 700, fontSize: '0.82rem' }}>
              ✓ NPCI Verified (Aadhaar Seeded)
            </span>
          </div>
        </div>
      </div>

      {/* Revenue Land Records & Patta Details */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--gov-green-700)" />
            <h4 style={{ fontSize: '0.95rem' }}>Registered Land & Patta Holdings</h4>
          </div>
          <span className="gov-badge gov-badge-slate">{currentUser.landAreaAcres} Acres</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Patta Number</span>
            <strong className="mono">{currentUser.pattaNumber}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Survey Numbers</span>
            <strong>{currentUser.surveyNumbers.join(', ')}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Revenue Village</span>
            <strong>{currentUser.village}, {currentUser.taluk}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gov-slate-500)' }}>Primary Cultivation</span>
            <strong>{currentUser.primaryCrop}</strong>
          </div>
        </div>
      </div>

      {/* Lifetime Procurement Summary */}
      <div className="grid-2">
        <div className="stat-card">
          <span className="stat-label">Total Procured</span>
          <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem' }}>
            {currentUser.totalProcuredLifetime} Qtl
          </div>
          <span className="stat-subtext">Lifetime across DPCs</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">DBT Payouts</span>
          <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem', color: 'var(--gov-green-800)' }}>
            ₹{currentUser.totalDisbursedLifetime?.toLocaleString('en-IN')}
          </div>
          <span className="stat-subtext">Direct to bank account</span>
        </div>
      </div>

      {/* Logout Action */}
      <button
        className="gov-btn gov-btn-secondary"
        onClick={handleLogout}
        style={{ color: 'var(--gov-earth-700)', borderColor: 'var(--gov-earth-100)' }}
      >
        <LogOut size={16} />
        <span>Log Out of Profile</span>
      </button>
    </div>
  );
}
