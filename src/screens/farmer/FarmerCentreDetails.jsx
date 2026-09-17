import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronLeft,
  MapPin,
  Scale,
  Droplets,
  SunMedium
} from 'lucide-react';

export function FarmerCentreDetails() {
  const { selectedCentreDetails, activeCentre, setFarmerScreen } = useAgrizen();
  const centre = selectedCentreDetails || activeCentre;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('centres')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>All Centres</span>
        </button>
        <span className="gov-badge gov-badge-green">{centre.status}</span>
      </div>

      {/* Centre Hero */}
      <div className="gov-card">
        <span className="gov-badge gov-badge-slate" style={{ fontSize: '0.7rem' }}>
          CENTRE CODE: {centre.code}
        </span>
        <h3 style={{ fontSize: '1.25rem', marginTop: '6px', color: 'var(--gov-slate-900)' }}>
          {centre.name}
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          {centre.address}, {centre.taluk}, {centre.district} - {centre.pincode}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--gov-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Operating Hours</span>
            <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{centre.operatingHours}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Daily Quota</span>
            <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{centre.dailyCapacityQuintals} Qtl / Day</div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Avg Wait Time</span>
            <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--gov-green-700)' }}>~{centre.averageWaitMinutes} mins</div>
          </div>
        </div>
      </div>

      {/* Supervisor Card */}
      <div className="gov-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
            Officer-in-Charge / DPC Supervisor
          </div>
          <h4 style={{ fontSize: '1rem', marginTop: '2px', color: 'var(--gov-slate-900)' }}>
            {centre.supervisor.name}
          </h4>
          <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)' }}>
            Staff ID: {centre.supervisor.staffId}
          </div>
        </div>

        <a
          href={`tel:${centre.supervisor.mobile}`}
          className="gov-btn gov-btn-secondary gov-btn-sm"
          style={{ textDecoration: 'none' }}
        >
          <Phone size={14} />
          <span>Call Desk</span>
        </a>
      </div>

      {/* Facilities Checklist */}
      <div className="gov-card">
        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Infrastructure & Facilities</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {centre.facilities.map((fac, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem' }}>
              <CheckCircle2 size={16} color="var(--gov-green-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: 'var(--gov-slate-800)' }}>{fac}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Crop Varieties */}
      <div className="gov-card">
        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Procurement Grain Types</h4>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {centre.supportedCrops.map((crop, idx) => (
            <span key={idx} className="gov-badge gov-badge-slate">
              {crop}
            </span>
          ))}
        </div>
      </div>

      <button
        className="gov-btn gov-btn-primary"
        onClick={() => setFarmerScreen('slot-booking')}
      >
        <Calendar size={16} />
        <span>Book Slot at this Centre</span>
      </button>
    </div>
  );
}
