import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  User,
  ShieldCheck,
  Building2,
  FileText,
  CreditCard,
  ChevronLeft,
  Calendar,
  Wheat,
  CheckCircle2
} from 'lucide-react';

export function StaffFarmerDetails() {
  const { selectedFarmerDetails, setStaffScreen } = useAgrizen();
  const farmer = selectedFarmerDetails;

  if (!farmer) {
    return (
      <div className="gov-empty-state">
        <p>No farmer selected.</p>
        <button className="gov-btn gov-btn-primary" onClick={() => setStaffScreen('farmers')}>
          Back to Farmers List
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setStaffScreen('farmers')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Farmers Roster</span>
        </button>
        <span className="gov-badge gov-badge-green">
          <ShieldCheck size={12} />
          UIDAI & e-Nilam Linked
        </span>
      </div>

      {/* Farmer Dossier Card */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span className="gov-badge gov-badge-slate mono" style={{ fontSize: '0.7rem' }}>
              {farmer.id}
            </span>
            <h2 style={{ fontSize: '1.45rem', marginTop: '4px', color: 'var(--gov-slate-900)' }}>
              {farmer.name}
            </h2>
            <div style={{ fontSize: '0.86rem', color: 'var(--gov-slate-600)' }}>
              {farmer.tamilName} • {farmer.village}, {farmer.taluk}, {farmer.district}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
              Mobile: <strong>{farmer.mobile}</strong> • Aadhaar: <span className="mono">{farmer.aadhaarMasked}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="gov-badge gov-badge-green">
              KYC VERIFIED
            </span>
            <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)', marginTop: '4px' }}>
              Registered: {farmer.registeredDate}
            </div>
          </div>
        </div>

        {/* Land Records Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--gov-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Patta Number</span>
            <div className="mono" style={{ fontWeight: 700 }}>{farmer.pattaNumber}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Survey Nos.</span>
            <div style={{ fontWeight: 700 }}>{farmer.surveyNumbers.join(', ')}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Cultivated Area</span>
            <div style={{ fontWeight: 700 }}>{farmer.landAreaAcres} Acres</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Expected Yield</span>
            <div style={{ fontWeight: 700 }}>{farmer.estimatedYieldQuintals} Qtl</div>
          </div>
        </div>
      </div>

      {/* Direct Benefit Transfer (DBT) Banking Details */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--gov-green-700)" />
            <h4 style={{ fontSize: '0.98rem' }}>Aadhaar Payment Bridge System (APBS) Record</h4>
          </div>
          <span className="gov-badge gov-badge-green" style={{ fontSize: '0.68rem' }}>
            NPCI Mandate Active
          </span>
        </div>

        <div style={{
          backgroundColor: 'var(--gov-slate-50)',
          borderRadius: 'var(--radius-md)',
          padding: '0.9rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Beneficiary Bank</span>
            <div style={{ fontWeight: 700 }}>{farmer.bankDetails.bankName}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>{farmer.bankDetails.branch}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>A/C Number</span>
            <div className="mono tabular-nums" style={{ fontWeight: 700 }}>{farmer.bankDetails.accountNumberMasked}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>IFSC &amp; NPCI</span>
            <div className="mono" style={{ fontWeight: 700 }}>{farmer.bankDetails.ifsc}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-green-700)', fontWeight: 600 }}>Aadhaar Seeded</div>
          </div>
        </div>
      </div>

      {/* Historical Deliveries */}
      <div className="grid-2">
        <div className="stat-card">
          <span className="stat-label">Total Paddy Procured (Lifetime)</span>
          <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem' }}>
            {farmer.totalProcuredLifetime} Quintals
          </div>
          <span className="stat-subtext">Across Thanjavur Direct Procurement Centres</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Disbursed to Account</span>
          <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem', color: 'var(--gov-green-800)' }}>
            ₹{farmer.totalDisbursedLifetime?.toLocaleString('en-IN')}
          </div>
          <span className="stat-subtext">Zero payment rejections recorded</span>
        </div>
      </div>
    </div>
  );
}
