import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  FileText,
  Printer,
  ChevronLeft,
  CheckCircle2,
  CreditCard,
  Building2,
  Wheat,
  Scale
} from 'lucide-react';

export function FarmerBookingDetails() {
  const { selectedBookingDetails, setFarmerScreen, addToast, playChime } = useAgrizen();

  const record = selectedBookingDetails;

  if (!record) {
    return (
      <div className="gov-empty-state">
        <p>No procurement record selected.</p>
        <button className="gov-btn gov-btn-primary" onClick={() => setFarmerScreen('history')}>
          Back to History
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    playChime();
    addToast("Generating digital weighment certificate PDF...", "info");
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('history')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Ledger</span>
        </button>
        <span className="gov-badge gov-badge-green">
          <CheckCircle2 size={12} />
          Settled via DBT
        </span>
      </div>

      {/* Official Weighment Certificate Sheet */}
      <div className="gov-card weighment-slip">
        <div style={{ textAlign: 'center', borderBottom: '2px solid var(--gov-slate-900)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Tamil Nadu Civil Supplies Corporation
          </div>
          <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', marginTop: '2px' }}>
            Official Weighment & DBT Settlement Slip
          </h3>
          <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-600)' }}>
            Slip Reference: <span className="mono">{record.weighmentSlipNo || "TNCSC/THJ/WS/2026-8941"}</span>
          </div>
        </div>

        {/* Breakdown Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Procurement Centre:</span>
            <strong>{record.centreName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Date of Delivery:</span>
            <strong className="tabular-nums">{record.slotDate}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Crop & Variety:</span>
            <strong>{record.crop}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Moisture Reading:</span>
            <strong>{record.moisturePercent || 14.2}% (Passed)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Gross Vehicle Weight:</span>
            <strong className="tabular-nums">{record.grossWeightKg || 8100} kg</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tare Trailer Weight:</span>
            <strong className="tabular-nums">{record.tareWeightKg || 2900} kg</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
            <span>Net Paddy Procured:</span>
            <strong className="tabular-nums" style={{ fontSize: '1.05rem', color: 'var(--gov-green-800)' }}>
              {record.quantityQuintals || record.netWeightQuintals} Quintals
            </strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: '8px', marginTop: '4px' }}>
            <span style={{ fontWeight: 700 }}>Total DBT Payout:</span>
            <strong className="tabular-nums" style={{ fontSize: '1.25rem', color: 'var(--gov-green-800)' }}>
              ₹{record.totalDisbursed?.toLocaleString('en-IN')}
            </strong>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)', textAlign: 'right' }}>
            UTR No: {record.utrNumber || "UTRIB2026082299841024"}
          </div>
        </div>

        {/* Official Stamp Simulation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--gov-border)' }}>
          <div className="slip-official-seal">
            TNCSC<br />DPC APPROVED<br />E-SIGN VERIFIED
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.74rem' }}>
            <div>DPC Superintendent: <strong>K. Sundaram</strong></div>
            <div style={{ color: 'var(--gov-slate-500)' }}>Digitally Stamped at Gate 1</div>
          </div>
        </div>
      </div>

      <button className="gov-btn gov-btn-primary" onClick={handlePrint}>
        <Printer size={16} />
        <span>Print Official Receipt</span>
      </button>
    </div>
  );
}
