import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  ChevronLeft,
  ShieldCheck,
  Scale,
  Droplets,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export function AdminCentreDetails() {
  const { selectedCentreDetails, activeCentre, setAdminScreen, addToast, playChime } = useAgrizen();
  const centre = selectedCentreDetails || activeCentre;

  const [quotaInput, setQuotaInput] = useState(centre.dailyCapacityQuintals);

  const handleUpdateQuota = () => {
    playChime();
    addToast(`Daily quota for ${centre.name} updated to ${quotaInput} Quintals`, "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setAdminScreen('centres')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Centres List</span>
        </button>
        <span className="gov-badge gov-badge-green">NABL Certified DPC</span>
      </div>

      <div className="gov-card">
        <span className="gov-badge gov-badge-slate mono" style={{ fontSize: '0.7rem' }}>
          CENTRE ID: {centre.code}
        </span>
        <h2 style={{ fontSize: '1.45rem', marginTop: '4px', color: 'var(--gov-slate-900)' }}>
          {centre.name}
        </h2>
        <div style={{ fontSize: '0.86rem', color: 'var(--gov-slate-600)' }}>
          {centre.address}, {centre.taluk}, {centre.district} - PIN {centre.pincode}
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
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Daily Capacity</span>
            <div style={{ fontWeight: 700 }}>{centre.dailyCapacityQuintals} Qtl</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Intake Today</span>
            <div style={{ fontWeight: 700, color: 'var(--gov-green-700)' }}>{centre.currentDayIntakeQuintals} Qtl</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Active Counters</span>
            <div style={{ fontWeight: 700 }}>{centre.activeCountersCount} Operational</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Avg Wait Time</span>
            <div style={{ fontWeight: 700 }}>~{centre.averageWaitMinutes} mins</div>
          </div>
        </div>
      </div>

      {/* State Admin Quota Allotment Override */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
          District Quota Allocation Override
        </h4>
        <p style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>
          Adjust maximum procurement tokens &amp; quintals for this direct procurement terminal.
        </p>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div className="gov-form-group" style={{ margin: 0, flex: 1 }}>
            <label className="gov-label" htmlFor="quota-input">Daily Target (Quintals)</label>
            <input
              id="quota-input"
              type="number"
              className="gov-input mono"
              value={quotaInput}
              onChange={(e) => setQuotaInput(Number(e.target.value))}
            />
          </div>

          <button className="gov-btn gov-btn-primary" onClick={handleUpdateQuota}>
            <span>Update State Mandate</span>
          </button>
        </div>
      </div>

      {/* Equipment Calibration Ledger */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
          Equipment NABL Calibration Audit
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: 'var(--gov-slate-50)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <strong>Pitless Weighbridge #01 (50 Tonne)</strong>
              <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>Weights &amp; Measures Dept. Seal: TN-WM-2026-9912</div>
            </div>
            <span className="gov-badge gov-badge-green" style={{ fontSize: '0.65rem' }}>Calibrated</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: 'var(--gov-slate-50)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <strong>Digital Grain Moisture Analyzer #01 &amp; #02 (AgroCal-PRO)</strong>
              <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>Tested with ISO 712 Reference Sample: Error &plusmn;0.1%</div>
            </div>
            <span className="gov-badge gov-badge-green" style={{ fontSize: '0.65rem' }}>Calibrated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
