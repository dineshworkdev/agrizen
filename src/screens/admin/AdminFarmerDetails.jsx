import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  User,
  ShieldCheck,
  CreditCard,
  ChevronLeft,
  Calendar,
  Building2,
  FileText
} from 'lucide-react';

export function AdminFarmerDetails() {
  const { selectedFarmerDetails, setAdminScreen } = useAgrizen();
  const farmer = selectedFarmerDetails;

  if (!farmer) {
    return (
      <div className="gov-empty-state">
        <p>No farmer selected.</p>
        <button className="gov-btn gov-btn-primary" onClick={() => setAdminScreen('farmers')}>
          Back to Farmer Registry
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setAdminScreen('farmers')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Master Registry</span>
        </button>
        <span className="gov-badge gov-badge-green">State Verified Dossier</span>
      </div>

      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span className="gov-badge gov-badge-slate mono" style={{ fontSize: '0.7rem' }}>
              UID: {farmer.id}
            </span>
            <h2 style={{ fontSize: '1.5rem', marginTop: '4px', color: 'var(--gov-slate-900)' }}>
              {farmer.name}
            </h2>
            <div style={{ fontSize: '0.86rem', color: 'var(--gov-slate-600)' }}>
              {farmer.tamilName} • {farmer.village}, {farmer.taluk}, {farmer.district}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
              Linked Mobile: <strong>{farmer.mobile}</strong> • Aadhaar: <span className="mono">{farmer.aadhaarMasked}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="gov-badge gov-badge-green">
              DBT APBS ACTIVE
            </span>
            <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)', marginTop: '4px' }}>
              e-Nilam Patta: {farmer.pattaNumber}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--gov-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Survey Numbers</span>
            <div style={{ fontWeight: 700 }}>{farmer.surveyNumbers.join(', ')}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Land Area</span>
            <div style={{ fontWeight: 700 }}>{farmer.landAreaAcres} Acres</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Total Lifetime Intake</span>
            <div style={{ fontWeight: 700 }}>{farmer.totalProcuredLifetime} Quintals</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Total DBT Disbursed</span>
            <div style={{ fontWeight: 700, color: 'var(--gov-green-800)' }}>₹{farmer.totalDisbursedLifetime.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Bank DBT Account Mapping */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
          PFMS Direct Benefit Transfer Account Binding
        </h4>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          backgroundColor: 'var(--gov-slate-50)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Bank</div>
            <strong style={{ fontSize: '0.9rem' }}>{farmer.bankDetails.bankName}</strong>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Account Masked</div>
            <strong className="mono">{farmer.bankDetails.accountNumberMasked}</strong>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>NPCI Aadhaar Seed Status</div>
            <strong style={{ color: 'var(--gov-green-700)', fontSize: '0.85rem' }}>Seeded &amp; Active</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
