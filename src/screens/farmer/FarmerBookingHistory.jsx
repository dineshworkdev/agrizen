import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  History,
  CheckCircle2,
  Calendar,
  CreditCard,
  ChevronLeft,
  ArrowRight,
  FileText
} from 'lucide-react';

export function FarmerBookingHistory() {
  const { bookingHistory, setSelectedBookingDetails, setFarmerScreen } = useAgrizen();

  const handleSelectRecord = (record) => {
    setSelectedBookingDetails(record);
    setFarmerScreen('booking-details');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">DBT Bank Ledger</span>
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gov-slate-900)' }}>
          Procurement History (முந்தைய பதிவுகள்)
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Official weighment receipts and Direct Benefit Transfer (DBT) credit settlements.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bookingHistory.map(record => (
          <div
            key={record.id}
            className="gov-card gov-card-interactive"
            onClick={() => handleSelectRecord(record)}
            style={{ padding: '1.1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <span className="gov-badge gov-badge-slate" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                  {record.season}
                </span>
                <h4 style={{ fontSize: '1rem', color: 'var(--gov-slate-900)' }}>
                  {record.crop}
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)' }}>
                  {record.centreName} • {record.slotDate}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="tabular-nums" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-green-800)' }}>
                  ₹{record.totalDisbursed?.toLocaleString('en-IN')}
                </div>
                <span className="gov-badge gov-badge-green" style={{ fontSize: '0.65rem' }}>
                  DBT Credited
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--gov-slate-50)',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              marginTop: '0.75rem',
              fontSize: '0.78rem',
              color: 'var(--gov-slate-700)'
            }}>
              <span>Net Weight: <strong>{record.quantityQuintals} Qtl</strong></span>
              <span>Moisture: <strong>{record.moisturePercent}%</strong></span>
              <span className="mono" style={{ fontSize: '0.7rem' }}>Slip: {record.weighmentSlipNo.split('/').pop()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
