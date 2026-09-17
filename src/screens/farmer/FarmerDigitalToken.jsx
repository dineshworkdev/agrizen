import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { QRCodeSVG } from '../../components/common/QRCodeSVG';
import {
  Download,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Truck,
  Wheat,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Printer,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

export function FarmerDigitalToken() {
  const { userToken, currentUser, activeCentre, setFarmerScreen, addToast, playChime } = useAgrizen();

  const handleDownload = () => {
    playChime();
    addToast("Official E-Pass PDF downloaded to device", "success");
  };

  const handleShare = () => {
    playChime();
    addToast("E-Pass link & SMS dispatched to registered mobile", "success");
  };

  if (!userToken) {
    return (
      <div className="gov-empty-state">
        <div className="gov-empty-icon">
          <Wheat size={28} />
        </div>
        <h3 style={{ fontSize: '1.2rem' }}>No Active Digital Token</h3>
        <p style={{ maxWidth: '340px', fontSize: '0.88rem' }}>
          You currently do not have an active procurement slot booking. Book a slot to generate your official anti-counterfeit e-Token.
        </p>
        <button
          className="gov-btn gov-btn-primary"
          onClick={() => setFarmerScreen('slot-booking')}
          style={{ marginTop: '0.5rem' }}
        >
          Book Procurement Slot Now
        </button>
      </div>
    );
  }

  return (
    <div className="digital-token-container">
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">
          <span className="pulse-dot green" />
          Live & Verified
        </span>
      </div>

      {/* Official GovTech Digital Token Card */}
      <div className="digital-token-card">
        <div className="token-security-pattern" />

        {/* Header Band */}
        <div className="token-header-band">
          <div className="token-emblem-row">
            <div>
              <div className="token-gov-label">
                Tamil Nadu Civil Supplies Corporation (TNCSC)
              </div>
              <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '2px' }}>
                Direct Procurement Centre Official E-Pass
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.04em'
            }}>
              KHARIF / SAMBA 2026
            </div>
          </div>

          <div className="token-number-hero tabular-nums">
            <span>{userToken.tokenNumber}</span>
            <ShieldCheck size={28} color="#86efac" />
          </div>
        </div>

        {/* Perforated Edge Divider */}
        <div className="token-perforation-divider">
          <div className="token-perforation-line" />
        </div>

        {/* Body Content */}
        <div className="token-body">
          {/* Centre & Slot Alert */}
          <div style={{
            background: 'var(--gov-green-50)',
            border: '1px solid rgba(21, 128, 61, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gov-green-800)', textTransform: 'uppercase' }}>
                Allotted Procurement Centre
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
                {userToken.centreName}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
                Queue Pos.
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-ochre-700)' }}>
                #{userToken.queuePosition}
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="token-meta-grid">
            <div className="token-meta-item">
              <span className="token-meta-label">Farmer Name</span>
              <span className="token-meta-val">{userToken.farmerName}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
                Patta: {userToken.patta}
              </span>
            </div>

            <div className="token-meta-item">
              <span className="token-meta-label">Reporting Date & Time</span>
              <span className="token-meta-val tabular-nums">{userToken.slotDate}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gov-green-700)' }}>
                {userToken.slotTime}
              </span>
            </div>

            <div className="token-meta-item">
              <span className="token-meta-label">Crop & Quantity</span>
              <span className="token-meta-val">{userToken.crop}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gov-slate-800)' }}>
                {userToken.quantityQuintals} Quintals (Est. ₹{userToken.calculatedPayout?.toLocaleString('en-IN')})
              </span>
            </div>

            <div className="token-meta-item">
              <span className="token-meta-label">Registered Vehicle</span>
              <span className="token-meta-val">{userToken.vehicleType}</span>
              <span className="mono" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gov-slate-700)' }}>
                {userToken.vehicleNumber}
              </span>
            </div>
          </div>

          {/* QR Code & Security Hash Row */}
          <div className="token-qr-section">
            <div className="token-qr-box">
              <QRCodeSVG value={`https://agrizen.tn.gov.in/verify?tkn=${userToken.tokenNumber}&hash=${userToken.securityHash}`} size={88} />
            </div>
            <div className="token-security-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle2 size={16} color="var(--gov-green-700)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gov-slate-900)' }}>
                  Aadhaar Seeded & DBT Verified
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--gov-slate-600)', margin: '2px 0 6px 0' }}>
                Bank: {userToken.dbtBank}
              </p>
              <div style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--gov-slate-500)',
                background: 'var(--gov-slate-100)',
                padding: '3px 6px',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-block'
              }}>
                HASH: {userToken.securityHash}
              </div>
            </div>
          </div>

          {/* Rules Micro Note */}
          <div style={{
            fontSize: '0.74rem',
            color: 'var(--gov-slate-500)',
            borderTop: '1px solid var(--gov-border)',
            paddingTop: '0.75rem',
            lineHeight: 1.4
          }}>
            ⚠️ <strong>Gate Instructions:</strong> Present this digital pass at Counter 1 for vehicle entry. Paddy moisture must not exceed 17.0%. Sun-drying yard is available if moisture is above threshold.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <button className="gov-btn gov-btn-primary" onClick={handleDownload}>
          <Download size={16} />
          <span>Download PDF Pass</span>
        </button>
        <button className="gov-btn gov-btn-secondary" onClick={handleShare}>
          <Share2 size={16} />
          <span>Share / Send SMS</span>
        </button>
      </div>

      {/* Shortcut to Live Queue and ETA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <button
          className="gov-btn gov-btn-secondary"
          onClick={() => setFarmerScreen('live-queue')}
          style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>CURRENT STATUS</div>
            <div style={{ fontWeight: 700 }}>Track Live Queue</div>
          </div>
          <ArrowRight size={16} />
        </button>

        <button
          className="gov-btn gov-btn-secondary"
          onClick={() => setFarmerScreen('eta')}
          style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>ADVISORY</div>
            <div style={{ fontWeight: 700 }}>When to Arrive (ETA)</div>
          </div>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
