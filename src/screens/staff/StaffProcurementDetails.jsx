import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  FileText,
  Printer,
  ChevronLeft,
  CheckCircle2,
  Building2,
  CreditCard,
  Download,
  Share2
} from 'lucide-react';

export function StaffProcurementDetails() {
  const { selectedBookingDetails, setStaffScreen, addToast, playChime } = useAgrizen();
  const lot = selectedBookingDetails;

  if (!lot) {
    return (
      <div className="gov-empty-state">
        <p>No procurement slip found.</p>
        <button className="gov-btn gov-btn-primary" onClick={() => setStaffScreen('dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    playChime();
    addToast("Weighment slip sent to thermal printer", "success");
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setStaffScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">DBT Authorization Active</span>
      </div>

      {/* Official Government Weighment Slip */}
      <div className="gov-card weighment-slip">
        <div style={{ textAlign: 'center', borderBottom: '2px solid var(--gov-slate-900)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Tamil Nadu Civil Supplies Corporation (TNCSC)
          </div>
          <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', marginTop: '2px' }}>
            Electronic Weighment Certificate &amp; DBT Credit Voucher
          </h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)' }}>
            Voucher Serial: <span className="mono">{lot.weighmentSlipNo || "TNCSC/THJ/WS/2026-9011"}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '0.86rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Procurement Centre</div>
            <strong>{lot.centreName}</strong>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Delivery Date &amp; Time</div>
            <strong className="tabular-nums">{lot.slotDate} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Farmer Name</div>
            <strong>{lot.farmerName}</strong>
            <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>Patta: {lot.patta || "184/2A"}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Vehicle Plate</div>
            <strong className="mono">{lot.vehicleNumber}</strong> ({lot.vehicleType})
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--gov-border)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Crop Category:</span>
            <strong>{lot.crop} (Grade A)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>NABL Moisture Analyzer Reading:</span>
            <strong>{lot.moisturePercent || 14.4}% (Passed &le; 17.0%)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Gross Laden Weight:</span>
            <strong className="mono tabular-nums">{lot.grossWeightKg || 7350} kg</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tare Unladen Weight:</span>
            <strong className="mono tabular-nums">{lot.tareWeightKg || 2850} kg</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #94a3b8', paddingTop: '6px' }}>
            <span>Net Accepted Weight:</span>
            <strong className="mono tabular-nums" style={{ fontSize: '1.15rem', color: 'var(--gov-green-800)' }}>
              {lot.netWeightQuintals || lot.quantityQuintals} Quintals
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: '8px', marginTop: '4px' }}>
            <span style={{ fontWeight: 800 }}>Net Disbursed Amount:</span>
            <strong className="tabular-nums" style={{ fontSize: '1.35rem', color: 'var(--gov-green-800)' }}>
              ₹{(lot.calculatedPayout || ((lot.quantityQuintals || 45) * 2420)).toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--gov-border)' }}>
          <div className="slip-official-seal">
            TNCSC<br />OFFICIALLY CERTIFIED<br />WEIGHBRIDGE 1
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.74rem' }}>
            <div>Weighman: <strong>P. Vignesh</strong></div>
            <div>DPC Superintendent: <strong>K. Sundaram, AO</strong></div>
            <div style={{ color: 'var(--gov-slate-500)', marginTop: '2px' }}>Cryptographically Signed: {lot.securityHash}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <button className="gov-btn gov-btn-primary" onClick={handlePrint}>
          <Printer size={16} />
          <span>Print Slip (2 Copies)</span>
        </button>

        <button className="gov-btn gov-btn-secondary" onClick={() => setStaffScreen('dashboard')}>
          <span>Return to Command Desk</span>
        </button>
      </div>
    </div>
  );
}
