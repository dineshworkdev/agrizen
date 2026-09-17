import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  FileText,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Droplets,
  Truck,
  CreditCard,
  Building2
} from 'lucide-react';

export function StaffQueueDetails() {
  const {
    selectedBookingDetails,
    advanceTokenStatus,
    setStaffScreen,
    addToast,
    playChime
  } = useAgrizen();

  const token = selectedBookingDetails;

  const [moistureInput, setMoistureInput] = useState(token?.moisturePercent || 14.2);
  const [grossWeightInput, setGrossWeightInput] = useState(token?.grossWeightKg || 7200);
  const [tareWeightInput, setTareWeightInput] = useState(token?.tareWeightKg || 2800);

  if (!token) {
    return (
      <div className="gov-empty-state">
        <p>No token selected for inspection.</p>
        <button className="gov-btn gov-btn-primary" onClick={() => setStaffScreen('live-queue')}>
          Back to Live Queue
        </button>
      </div>
    );
  }

  const netQuintals = Math.max(0, (grossWeightInput - tareWeightInput) / 100);

  const handleAdvance = (newStatus) => {
    playChime();
    advanceTokenStatus(token.id, newStatus, {
      moisturePercent: Number(moistureInput),
      grossWeightKg: Number(grossWeightInput),
      tareWeightKg: Number(tareWeightInput),
      netWeightQuintals: netQuintals,
      quantityQuintals: netQuintals
    });
    addToast(`Token ${token.tokenNumber} updated to ${newStatus}`, "success");
    setStaffScreen('live-queue');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setStaffScreen('live-queue')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Queue Ledger</span>
        </button>
        <span className="gov-badge gov-badge-slate">{token.status}</span>
      </div>

      {/* Hero Token Card */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
              Lot Inspection
            </div>
            <h2 className="mono tabular-nums" style={{ fontSize: '1.6rem', color: 'var(--gov-green-800)' }}>
              {token.tokenNumber}
            </h2>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gov-slate-900)', marginTop: '2px' }}>
              {token.farmerName} ({token.village})
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="gov-badge gov-badge-ochre tabular-nums" style={{ fontSize: '0.75rem' }}>
              Queue #{token.queuePosition > 0 ? token.queuePosition : 'Serving'}
            </span>
            <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)', marginTop: '4px' }}>
              Vehicle: <strong>{token.vehicleType}</strong> ({token.vehicleNumber})
            </div>
          </div>
        </div>

        {/* Verification Checks Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--gov-border)'
        }}>
          <div style={{ backgroundColor: 'var(--gov-slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Patta Number</span>
            <div style={{ fontWeight: 700 }}>{token.patta || "184/2A"}</div>
            <span style={{ fontSize: '0.68rem', color: 'var(--gov-green-700)' }}>✓ e-Nilam Verified</span>
          </div>

          <div style={{ backgroundColor: 'var(--gov-slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Crop Declared</span>
            <div style={{ fontWeight: 700 }}>{token.crop}</div>
            <span style={{ fontSize: '0.68rem', color: 'var(--gov-slate-600)' }}>Grade A Quality</span>
          </div>

          <div style={{ backgroundColor: 'var(--gov-slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Security Hash</span>
            <div className="mono" style={{ fontWeight: 600, fontSize: '0.8rem' }}>{token.securityHash}</div>
            <span style={{ fontSize: '0.68rem', color: 'var(--gov-green-700)' }}>✓ Anti-Tamper Pass</span>
          </div>
        </div>
      </div>

      {/* Live Physical Intake Entry */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
          Weighbridge & Moisture Lab Inputs
        </h4>

        <div className="grid-3">
          <div className="gov-form-group">
            <label className="gov-label" htmlFor="moisture-val">Digital Moisture Probe (%)</label>
            <input
              id="moisture-val"
              type="number"
              step="0.1"
              className="gov-input"
              value={moistureInput}
              onChange={(e) => setMoistureInput(e.target.value)}
            />
            <span style={{ fontSize: '0.72rem', color: Number(moistureInput) <= 17.0 ? 'var(--gov-green-700)' : 'var(--gov-earth-700)' }}>
              {Number(moistureInput) <= 17.0 ? "✓ Passed standard limit (&le; 17.0%)" : "⚠️ Exceeds 17.0% limit. Direct to drying yard."}
            </span>
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="gross-weight">Gross Weight (kg)</label>
            <input
              id="gross-weight"
              type="number"
              className="gov-input mono tabular-nums"
              value={grossWeightInput}
              onChange={(e) => setGrossWeightInput(e.target.value)}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>Tractor + Trailer Loaded</span>
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="tare-weight">Tare Weight (kg)</label>
            <input
              id="tare-weight"
              type="number"
              className="gov-input mono tabular-nums"
              value={tareWeightInput}
              onChange={(e) => setTareWeightInput(e.target.value)}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>Empty Trailer Offloaded</span>
          </div>
        </div>

        {/* Net Calculated Output */}
        <div style={{
          backgroundColor: 'var(--gov-green-50)',
          border: '1.5px solid rgba(21, 128, 61, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '0.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gov-green-800)', textTransform: 'uppercase' }}>
              Calculated Net Quintals
            </div>
            <div className="tabular-nums" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-green-900)' }}>
              {netQuintals.toFixed(2)} Quintals
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
              Total DBT Settlement
            </div>
            <div className="tabular-nums" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-green-900)' }}>
              ₹{(netQuintals * 2420).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Counter Action Workflow Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <button
          className="gov-btn gov-btn-secondary"
          onClick={() => handleAdvance('IN_INSPECTION')}
        >
          <Droplets size={16} />
          <span>Send for Moisture Lab Check</span>
        </button>

        <button
          className="gov-btn gov-btn-ochre"
          onClick={() => handleAdvance('WEIGHED')}
        >
          <Scale size={16} />
          <span>Confirm Weighbridge Gross</span>
        </button>

        <button
          className="gov-btn gov-btn-primary"
          onClick={() => handleAdvance('COMPLETED')}
        >
          <CheckCircle2 size={16} />
          <span>Finalize &amp; Dispatch DBT</span>
        </button>
      </div>
    </div>
  );
}
