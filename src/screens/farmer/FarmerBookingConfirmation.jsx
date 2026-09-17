import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { QRCodeSVG } from '../../components/common/QRCodeSVG';
import {
  CheckCircle2,
  Ticket,
  Calendar,
  Clock,
  Building2,
  ArrowRight,
  Download,
  Share2,
  MessageSquare
} from 'lucide-react';

export function FarmerBookingConfirmation() {
  const { selectedBookingDetails, userToken, setFarmerScreen, addToast, playChime } = useAgrizen();
  const token = selectedBookingDetails || userToken;

  if (!token) {
    return (
      <div className="gov-empty-state">
        <p>No booking details to display.</p>
        <button className="gov-btn gov-btn-primary" onClick={() => setFarmerScreen('dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
      {/* Celebration Icon & Heading */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--gov-border)',
        padding: '2rem 1.5rem',
        boxShadow: 'var(--gov-shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--gov-green-100)',
          color: 'var(--gov-green-700)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulseGreen 2s infinite'
        }}>
          <CheckCircle2 size={36} />
        </div>

        <div>
          <span className="gov-badge gov-badge-green" style={{ marginBottom: '6px' }}>
            Official Booking Confirmed
          </span>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--gov-slate-900)' }}>
            Digital Token Generated
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--gov-slate-600)', maxWidth: '340px', margin: '4px auto 0 auto' }}>
            Your procurement appointment has been registered on the TNCSC Central Queue Engine.
          </p>
        </div>

        {/* Big Token Number Pill */}
        <div style={{
          backgroundColor: 'var(--gov-slate-50)',
          border: '2px dashed var(--gov-green-700)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.5rem',
          marginTop: '0.5rem',
          width: '100%',
          maxWidth: '380px'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gov-slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Official Token Number
          </div>
          <div className="mono tabular-nums" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gov-green-800)', letterSpacing: '0.04em' }}>
            {token.tokenNumber}
          </div>
        </div>

        {/* Key Appointment Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'left'
        }}>
          <div style={{ backgroundColor: 'var(--gov-slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Centre</div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--gov-slate-900)' }}>{token.centreName}</div>
          </div>

          <div style={{ backgroundColor: 'var(--gov-slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Date & Slot</div>
            <div className="tabular-nums" style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--gov-slate-900)' }}>
              {token.slotDate}<br />{token.slotTime}
            </div>
          </div>
        </div>

        {/* SMS Alert Simulation Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.78rem',
          color: 'var(--gov-slate-600)',
          backgroundColor: '#f1f5f9',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
          maxWidth: '380px',
          width: '100%'
        }}>
          <MessageSquare size={16} color="var(--gov-green-700)" />
          <span>SMS confirmation with QR pass dispatched to registered mobile.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '380px', margin: '0 auto', width: '100%' }}>
        <button
          className="gov-btn gov-btn-primary gov-btn-lg"
          onClick={() => setFarmerScreen('digital-token')}
        >
          <Ticket size={18} />
          <span>View Official Digital Pass</span>
        </button>

        <button
          className="gov-btn gov-btn-secondary"
          onClick={() => setFarmerScreen('live-queue')}
        >
          <span>Track Live Centre Queue</span>
          <ArrowRight size={16} />
        </button>

        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ color: 'var(--gov-slate-600)' }}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
