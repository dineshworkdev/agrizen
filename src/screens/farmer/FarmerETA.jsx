import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Clock,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Building2,
  Sliders,
  ChevronLeft,
  ArrowRight,
  TrendingDown,
  SunMedium
} from 'lucide-react';

export function FarmerETA() {
  const { userToken, activeCentre, setFarmerScreen, isDelaySimulated, toggleWeatherDelay } = useAgrizen();

  // Interactive transit calculator state
  const [transitKm, setTransitKm] = useState(12); // distance from village
  const [vehicleSpeedKmh, setVehicleSpeedKmh] = useState(25); // Tractor @ 25kmh

  // Calculations
  const travelMinutes = Math.round((transitKm / vehicleSpeedKmh) * 60);
  const gateCheckinBuffer = 10;
  const delayBuffer = isDelaySimulated ? 15 : 0;
  const queueBacklogMinutes = 22; // based on 3 tokens ahead

  // Base slot target is 11:00 AM
  // Recommended arrival: Slot time (11:00 AM) minus buffer = 10:45 AM
  const recommendedTimeStr = isDelaySimulated ? "11:00 AM" : "10:45 AM";
  const optimalWindowStr = isDelaySimulated ? "10:55 AM – 11:10 AM" : "10:40 AM – 10:55 AM";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">
          <span className="pulse-dot green" />
          Live Prediction Engine
        </span>
      </div>

      {/* ==========================================================================
         VISUAL HIGHLIGHT #3: HERO "WHEN SHOULD I ARRIVE?" ADVISORY CARD
         ========================================================================== */}
      <div className="eta-hero-card">
        <div className="eta-primary-question">
          Primary Farmer Advisory • நேரடி வருகை கணிப்பு
        </div>

        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gov-slate-700)' }}>
          When should I arrive at {activeCentre.name}?
        </div>

        <div className="eta-recommended-time tabular-nums">
          {recommendedTimeStr}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div className="eta-buffer-pill">
            <Clock size={14} />
            <span>Optimal Window: {optimalWindowStr}</span>
          </div>

          <span className={`gov-badge ${isDelaySimulated ? 'gov-badge-earth' : 'gov-badge-green'}`}>
            {isDelaySimulated ? 'WEATHER DELAY: +15 MIN' : 'ON SCHEDULE'}
          </span>
        </div>

        {/* Why this time? Intelligent Calculation Breakdown */}
        <div className="eta-breakdown-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gov-slate-900)', textTransform: 'uppercase' }}>
              Dynamic Calculation Factors
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>
              Updated 2 mins ago
            </span>
          </div>

          <div className="eta-factor-row">
            <span style={{ color: 'var(--gov-slate-600)' }}>Allotted Booking Slot</span>
            <strong className="tabular-nums">{userToken ? userToken.slotTime : "11:00 AM - 12:00 PM"}</strong>
          </div>

          <div className="eta-factor-row">
            <span style={{ color: 'var(--gov-slate-600)' }}>Current Processing Velocity</span>
            <strong className="tabular-nums" style={{ color: 'var(--gov-green-700)' }}>
              8.2 mins / token across 4 counters
            </strong>
          </div>

          <div className="eta-factor-row">
            <span style={{ color: 'var(--gov-slate-600)' }}>Farmers Ahead in Queue</span>
            <strong className="tabular-nums">{userToken ? userToken.queuePosition - 1 : 2} Farmers (~18 mins wait)</strong>
          </div>

          <div className="eta-factor-row">
            <span style={{ color: 'var(--gov-slate-600)' }}>Transit Time from Village</span>
            <strong className="tabular-nums">{travelMinutes} mins ({transitKm} km @ {vehicleSpeedKmh} km/h)</strong>
          </div>

          <div className="eta-factor-row">
            <span style={{ color: 'var(--gov-slate-600)' }}>Gate Check-in & Security Buffer</span>
            <strong className="tabular-nums">+10 mins recommended</strong>
          </div>

          {isDelaySimulated && (
            <div className="eta-factor-row" style={{ color: 'var(--gov-earth-700)' }}>
              <span>Dampness Delay Factor</span>
              <strong>+15 mins (Yard Drying Buffer)</strong>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Status Matrix */}
      <div className="grid-3">
        <div className="stat-card">
          <span className="stat-label">Queue Ahead</span>
          <div className="stat-value tabular-nums">
            {userToken ? userToken.queuePosition - 1 : 2}
          </div>
          <span className="stat-subtext">Lots staging in yard</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Active Counters</span>
          <div className="stat-value tabular-nums">
            4 / 4
          </div>
          <span className="stat-subtext">All weighing bays open</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Centre Status</span>
          <div className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--gov-green-700)' }}>
            Smooth
          </div>
          <span className="stat-subtext">Avg wait ~16 mins</span>
        </div>
      </div>

      {/* Interactive Transit Calculator */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={18} color="var(--gov-green-700)" />
            <h4 style={{ fontSize: '0.95rem' }}>Personalize Transit Time</h4>
          </div>
          <span className="gov-badge gov-badge-slate">{travelMinutes} mins travel</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
              <label htmlFor="distance-range" className="gov-label" style={{ margin: 0 }}>Distance from Village to DPC</label>
              <strong className="tabular-nums">{transitKm} Kilometers</strong>
            </div>
            <input
              id="distance-range"
              type="range"
              min="2"
              max="45"
              value={transitKm}
              onChange={(e) => setTransitKm(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label className="gov-label">Vehicle Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                className={`gov-btn ${vehicleSpeedKmh === 25 ? 'gov-btn-primary' : 'gov-btn-secondary'} gov-btn-sm`}
                onClick={() => setVehicleSpeedKmh(25)}
              >
                🚜 Tractor (25 km/h)
              </button>
              <button
                type="button"
                className={`gov-btn ${vehicleSpeedKmh === 40 ? 'gov-btn-primary' : 'gov-btn-secondary'} gov-btn-sm`}
                onClick={() => setVehicleSpeedKmh(40)}
              >
                🚚 Mini Truck (40 km/h)
              </button>
              <button
                type="button"
                className={`gov-btn ${vehicleSpeedKmh === 12 ? 'gov-btn-primary' : 'gov-btn-secondary'} gov-btn-sm`}
                onClick={() => setVehicleSpeedKmh(12)}
              >
                🐂 Cart (12 km/h)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sun Drying Yard & Weather Status */}
      <div className="weather-advisory-banner">
        <SunMedium size={24} color="#ca8a04" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#854d0e' }}>
            Drying Yard Conditions: 32°C Sunny (Clear Skies)
          </div>
          <p style={{ fontSize: '0.78rem', color: '#a16207', marginTop: '2px' }}>
            Current ambient solar drying index is optimal. If your paddy lot tests at 17.5% moisture, 45 minutes on the concrete drying yard will bring it within the 17.0% Grade A procurement limit.
          </p>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <button
          className="gov-btn gov-btn-primary"
          onClick={() => setFarmerScreen('live-queue')}
        >
          <span>View Live Queue Board</span>
          <ArrowRight size={16} />
        </button>

        <button
          className="gov-btn gov-btn-secondary"
          onClick={() => setFarmerScreen('digital-token')}
        >
          <span>View My Digital Token</span>
        </button>
      </div>
    </div>
  );
}
