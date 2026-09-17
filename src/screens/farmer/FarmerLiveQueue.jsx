import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Clock,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  Volume2,
  VolumeX,
  RotateCw,
  Building2,
  Scale,
  Droplets,
  CreditCard,
  Truck,
  ChevronLeft
} from 'lucide-react';

export function FarmerLiveQueue() {
  const {
    userToken,
    tokens,
    counters,
    activeCentre,
    setFarmerScreen,
    callNextToken,
    addToast,
    playChime,
    isDelaySimulated
  } = useAgrizen();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter tokens at this centre
  const centreTokens = tokens.filter(t => t.centreId === activeCentre.id);
  const servingTokens = centreTokens.filter(t => t.status === 'AT_COUNTER' || t.status === 'IN_INSPECTION');
  const waitingTokens = centreTokens.filter(t => t.status === 'IN_QUEUE');

  // Find farmer's current position and people ahead
  let peopleAhead = 0;
  if (userToken && userToken.status === 'IN_QUEUE') {
    peopleAhead = waitingTokens.filter(t => t.queuePosition < userToken.queuePosition).length;
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    playChime();
    setTimeout(() => {
      setIsRefreshing(false);
      addToast("Live queue synchronized with DPC sensors", "info");
    }, 500);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) playChime();
      addToast(next ? "Audio turn chimes enabled" : "Audio chimes muted", "info");
      return next;
    });
  };

  return (
    <div className="live-queue-board">
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className={`gov-btn-ghost gov-btn-sm ${soundEnabled ? 'active' : ''}`}
            onClick={toggleSound}
            title="Toggle Audio Announcement Chime"
            style={{ padding: '6px' }}
          >
            {soundEnabled ? <Volume2 size={16} color="var(--gov-green-700)" /> : <VolumeX size={16} color="var(--gov-slate-400)" />}
          </button>

          <button
            className="gov-btn-ghost gov-btn-sm"
            onClick={handleRefresh}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <RotateCw size={14} className={isRefreshing ? 'gov-spinner' : ''} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Centre Status Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--gov-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.9rem 1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Building2 size={20} color="var(--gov-green-800)" />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
              {activeCentre.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
              4 Counters Active • Velocity: ~8 mins/lot
            </div>
          </div>
        </div>

        <span className={`gov-badge ${activeCentre.status === 'HIGH_RUSH' ? 'gov-badge-ochre' : 'gov-badge-green'}`}>
          <span className={`pulse-dot ${activeCentre.status === 'HIGH_RUSH' ? 'ochre' : 'green'}`} />
          {activeCentre.status}
        </span>
      </div>

      {/* Delay Alert Notification if Simulated */}
      {isDelaySimulated && (
        <div style={{
          backgroundColor: 'var(--gov-earth-50)',
          border: '1.5px solid var(--gov-earth-100)',
          borderLeft: '4px solid var(--gov-earth-600)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle size={20} color="var(--gov-earth-700)" />
          <div style={{ fontSize: '0.82rem', color: 'var(--gov-earth-800)' }}>
            <strong>Weather Notice:</strong> Morning dampness buffer active (+15 min delay). Moisture analyzers taking additional calibration readings.
          </div>
        </div>
      )}

      {/* Serving Hero Banner */}
      <div className="serving-banner">
        <div className="serving-top-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulse-dot green" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gov-green-900)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Currently Serving At Counters
            </span>
          </div>
          <span className="gov-badge gov-badge-green" style={{ fontSize: '0.7rem' }}>
            LIVE SENSOR FEED
          </span>
        </div>

        {/* Counter Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          marginTop: '0.75rem'
        }}>
          {counters.map(c => (
            <div
              key={c.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--gov-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gov-slate-500)' }}>
                  COUNTER {c.number}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--gov-green-700)', fontWeight: 600 }}>
                  Active
                </span>
              </div>
              <div className="mono tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
                {c.currentServingToken}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c.name.split(' ')[0]} {c.name.split(' ')[1]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farmer's Position Hero Card */}
      {userToken ? (
        <div className="user-queue-position-card">
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-ochre-800)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Your Token Status
            </div>
            <div className="mono tabular-nums" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
              {userToken.tokenNumber}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
              {userToken.status === 'AT_COUNTER' ? (
                <strong style={{ color: 'var(--gov-green-700)' }}>🎉 CALLED: Please proceed to {userToken.assignedCounter}!</strong>
              ) : (
                <>
                  <strong>{peopleAhead} Farmer{peopleAhead !== 1 ? 's' : ''} Ahead</strong> • Est. wait ~{peopleAhead * 8 + (isDelaySimulated ? 15 : 0)} mins
                </>
              )}
            </div>
          </div>

          <div className="position-number-badge tabular-nums">
            #{userToken.queuePosition}
          </div>
        </div>
      ) : (
        <div className="gov-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <p style={{ fontSize: '0.85rem' }}>No active token for current farmer profile.</p>
        </div>
      )}

      {/* 5-Stage Procurement Progress Visualizer */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.95rem' }}>Procurement Stage Flow</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>Step 2 of 5</span>
        </div>

        <div className="stage-progress-track">
          <div className="stage-track-line" />

          {/* Stage 1 */}
          <div className="stage-step-item completed">
            <div className="stage-step-node">
              <CheckCircle size={14} />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gov-slate-900)' }}>
              1. Gate Entry & Token Check
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)' }}>
              Aadhaar & Patta matched. Staging in vehicle holding yard.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="stage-step-item active">
            <div className="stage-step-node">
              <Scale size={12} color="var(--gov-ochre-700)" />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gov-ochre-800)' }}>
              2. Gross Weighbridge
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)' }}>
              Tractor + loaded trailer gross weighment on NABL 50T bridge.
            </p>
          </div>

          {/* Stage 3 */}
          <div className="stage-step-item">
            <div className="stage-step-node">
              <Droplets size={12} color="var(--gov-slate-400)" />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--gov-slate-600)' }}>
              3. Moisture & Quality Inspection
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)' }}>
              Digital probe test (Must be &le; 17.0% for Grade A standard).
            </p>
          </div>

          {/* Stage 4 */}
          <div className="stage-step-item">
            <div className="stage-step-node">
              <Truck size={12} color="var(--gov-slate-400)" />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--gov-slate-600)' }}>
              4. Offloading, Bagging & Tare Weighment
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)' }}>
              Paddy transferred to jute gunny bags; empty trailer tare recorded.
            </p>
          </div>

          {/* Stage 5 */}
          <div className="stage-step-item">
            <div className="stage-step-node">
              <CreditCard size={12} color="var(--gov-slate-400)" />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--gov-slate-600)' }}>
              5. Direct Benefit Transfer (DBT) Payout Trigger
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)' }}>
              Digital weighment slip issued; automated PFMS credit within 24-48h.
            </p>
          </div>
        </div>
      </div>

      {/* Up Next in Queue List */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '0.95rem' }}>Upcoming Tokens in Waiting Area</h4>
          <span className="gov-badge gov-badge-slate">{waitingTokens.length} Waiting</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {waitingTokens.map(t => {
            const isMe = userToken && t.id === userToken.id;
            return (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isMe ? 'var(--gov-ochre-50)' : 'var(--gov-slate-50)',
                  border: isMe ? '1.5px solid var(--gov-ochre-500)' : '1px solid var(--gov-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isMe ? 'var(--gov-ochre-600)' : 'var(--gov-slate-200)',
                    color: isMe ? '#ffffff' : 'var(--gov-slate-800)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem'
                  }}>
                    #{t.queuePosition}
                  </div>
                  <div>
                    <div className="mono" style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--gov-slate-900)' }}>
                      {t.tokenNumber} {isMe && <span style={{ color: 'var(--gov-ochre-800)', fontWeight: 800 }}>(YOU)</span>}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>
                      {t.farmerName} • {t.quantityQuintals} Qtl • {t.vehicleType}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="gov-badge gov-badge-slate" style={{ fontSize: '0.68rem' }}>
                    {t.slotTime.split('-')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
