import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Ticket,
  Clock,
  Activity,
  Calendar,
  Building2,
  Wheat,
  TrendingUp,
  SunMedium,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  User,
  History,
  PhoneCall
} from 'lucide-react';

export function FarmerDashboard() {
  const {
    currentUser,
    userToken,
    activeCentre,
    setFarmerScreen,
    setSelectedCentreDetails,
    centres,
    isDelaySimulated
  } = useAgrizen();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Welcome Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--gov-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem',
        boxShadow: 'var(--gov-shadow-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
              Tamil Nadu Civil Supplies Corporation
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', marginTop: '2px', color: 'var(--gov-slate-900)' }}>
            Vanakkam, {currentUser.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
            <span className="gov-badge gov-badge-green" style={{ fontSize: '0.72rem' }}>
              <ShieldCheck size={12} />
              Aadhaar & Patta Verified
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)' }}>
              {currentUser.village}, {currentUser.district}
            </span>
          </div>
        </div>

        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'var(--gov-green-100)',
          color: 'var(--gov-green-800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.2rem',
          flexShrink: 0
        }}>
          {currentUser.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      {/* Weather & Sun-Drying Status Strip */}
      <div className="weather-advisory-banner">
        <SunMedium size={22} color="#ca8a04" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#854d0e' }}>
            Delta Region Weather: 32°C Sunny • Excellent Drying Yard Conditions
          </div>
          <p style={{ fontSize: '0.76rem', color: '#a16207', marginTop: '2px' }}>
            Thanjavur South DPC covered shed and concrete drying yard active. Moisture loss rate: ~0.4%/hr.
          </p>
        </div>
      </div>

      {/* Active Token Hero Card (If user has an active token) */}
      {userToken ? (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, var(--gov-green-50) 100%)',
          border: '2px solid var(--gov-green-600)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          boxShadow: 'var(--gov-shadow-md)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot green" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gov-green-900)', textTransform: 'uppercase' }}>
                Active Digital Token
              </span>
            </div>
            <span className="gov-badge gov-badge-ochre tabular-nums" style={{ fontSize: '0.72rem' }}>
              Queue Pos #{userToken.queuePosition}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div>
              <div className="mono tabular-nums" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
                {userToken.tokenNumber}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
                {userToken.centreName}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
                Slot Time
              </div>
              <div className="tabular-nums" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-slate-800)' }}>
                {userToken.slotTime}
              </div>
            </div>
          </div>

          {/* Quick ETA & Recommended Arrival Banner inside Token Card */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(21, 128, 61, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
                Recommended Arrival Time
              </div>
              <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-green-800)' }}>
                {isDelaySimulated ? "11:00 AM (+15m delay)" : userToken.recommendedArrival}
              </div>
            </div>

            <button
              className="gov-btn gov-btn-sm gov-btn-primary"
              onClick={() => setFarmerScreen('live-queue')}
            >
              <span>Track Live Queue</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '0.85rem' }}>
            <button
              className="gov-btn gov-btn-secondary gov-btn-sm"
              style={{ flex: 1 }}
              onClick={() => setFarmerScreen('digital-token')}
            >
              <Ticket size={14} />
              <span>View Full E-Pass</span>
            </button>
            <button
              className="gov-btn gov-btn-secondary gov-btn-sm"
              style={{ flex: 1 }}
              onClick={() => setFarmerScreen('eta')}
            >
              <Clock size={14} />
              <span>ETA Breakdown</span>
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#ffffff',
          border: '2px dashed var(--gov-border-strong)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <Wheat size={32} color="var(--gov-green-700)" style={{ margin: '0 auto 8px auto' }} />
          <h4 style={{ fontSize: '1.05rem' }}>Ready to Sell Your Paddy Harvest?</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', maxWidth: '320px', margin: '4px auto 12px auto' }}>
            Book a procurement slot at your nearest Direct Procurement Centre to skip tractor lines.
          </p>
          <button
            className="gov-btn gov-btn-primary"
            onClick={() => setFarmerScreen('slot-booking')}
          >
            <Calendar size={16} />
            <span>Book Slot at MSP ₹2,420/Qtl</span>
          </button>
        </div>
      )}

      {/* Quick Services Grid */}
      <div>
        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Direct Farmer Services</h4>
        <div className="farmer-quick-grid">
          <div className="quick-action-card" onClick={() => setFarmerScreen('slot-booking')}>
            <div className="quick-action-icon green">
              <Calendar size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--gov-slate-900)' }}>
                Book Slot
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
                Choose date & time window
              </div>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => setFarmerScreen('live-queue')}>
            <div className="quick-action-icon ochre">
              <Activity size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--gov-slate-900)' }}>
                Live Queue
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
                Real-time counter tracker
              </div>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => setFarmerScreen('centres')}>
            <div className="quick-action-icon blue">
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--gov-slate-900)' }}>
                DPC Centres
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
                Wait times & facilities
              </div>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => setFarmerScreen('crop-details')}>
            <div className="quick-action-icon earth">
              <TrendingUp size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--gov-slate-900)' }}>
                MSP & Moisture
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
                Official rates & quality
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current MSP Rate Highlight Banner */}
      <div className="gov-card" style={{ background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <span className="gov-badge gov-badge-green" style={{ fontSize: '0.7rem' }}>
              GOVERNMENT ASSURED PRICE
            </span>
            <h4 style={{ fontSize: '1.05rem', marginTop: '4px' }}>
              Paddy Grade A (Ponni / Samba)
            </h4>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="tabular-nums" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-green-800)' }}>
              ₹2,420
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>
              per Quintal (incl. ₹100 TN incentive)
            </span>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--gov-border)',
          paddingTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: 'var(--gov-slate-600)'
        }}>
          <span>Max Permissible Moisture: <strong>17.0%</strong></span>
          <button
            className="gov-btn-ghost gov-btn-sm"
            onClick={() => setFarmerScreen('crop-details')}
            style={{ color: 'var(--gov-green-700)', padding: 0 }}
          >
            View All Crops &rarr;
          </button>
        </div>
      </div>

      {/* Toll-Free Kisan Helpline Strip */}
      <div style={{
        backgroundColor: 'var(--gov-slate-100)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.85rem 1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneCall size={18} color="var(--gov-green-700)" />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gov-slate-900)' }}>
              Kisan Toll-Free Helpline: 1800-180-1551
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>
              Free 24/7 DPC Queue Grievances & Moisture Assistance
            </div>
          </div>
        </div>
        <button
          className="gov-btn-secondary gov-btn-sm"
          onClick={() => setFarmerScreen('help')}
        >
          Help
        </button>
      </div>
    </div>
  );
}
