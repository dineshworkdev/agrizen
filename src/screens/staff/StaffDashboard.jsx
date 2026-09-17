import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  Users,
  Activity,
  Scale,
  Droplets,
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Radio
} from 'lucide-react';

export function StaffDashboard() {
  const {
    activeCentre,
    counters,
    tokens,
    callNextToken,
    setStaffScreen,
    setSelectedBookingDetails,
    addToast,
    playChime,
    isDelaySimulated
  } = useAgrizen();

  // Metrics
  const centreTokens = tokens.filter(t => t.centreId === activeCentre.id);
  const waitingTokens = centreTokens.filter(t => t.status === 'IN_QUEUE');
  const activeTokens = centreTokens.filter(t => t.status === 'AT_COUNTER' || t.status === 'IN_INSPECTION');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Centre Command Header */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--gov-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        boxShadow: 'var(--gov-shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="gov-badge gov-badge-green">
              <span className="pulse-dot green" />
              LIVE OPERATIONS DESK
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--gov-slate-500)' }}>
              Shift 1 (08:30 AM - 01:30 PM)
            </span>
          </div>

          <h2 style={{ fontSize: '1.45rem', marginTop: '4px', color: 'var(--gov-slate-900)' }}>
            {activeCentre.name}
          </h2>
          <div style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Officer-in-Charge: <strong>{activeCentre.supervisor.name}</strong> • Staff ID: <span className="mono">{activeCentre.supervisor.staffId}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="gov-btn gov-btn-primary"
            onClick={() => callNextToken('CTR-03')}
          >
            <Play size={16} />
            <span>Call Next Token</span>
          </button>

          <button
            className="gov-btn gov-btn-secondary"
            onClick={() => setStaffScreen('procurement')}
          >
            <Scale size={16} />
            <span>Record Weighment</span>
          </button>
        </div>
      </div>

      {/* Weather Delay Alert if Active */}
      {isDelaySimulated && (
        <div style={{
          backgroundColor: 'var(--gov-earth-50)',
          border: '1.5px solid var(--gov-earth-100)',
          borderLeft: '4px solid var(--gov-earth-600)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertTriangle size={20} color="var(--gov-earth-700)" />
          <div style={{ fontSize: '0.85rem', color: 'var(--gov-earth-900)' }}>
            <strong>Yard Alert Active:</strong> High moisture dampness buffer (+15m) applied to queue predictions. Ensure moisture lab probe calibration check.
          </div>
        </div>
      )}

      {/* KPI Metrics Bar */}
      <div className="staff-metrics-bar">
        <div className="metric-card-primary">
          <div>
            <div className="stat-label">Today's Intake vs Target</div>
            <div className="stat-value tabular-nums" style={{ color: '#ffffff' }}>
              {activeCentre.currentDayIntakeQuintals} <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#a7f3d0' }}>/ {activeCentre.dailyCapacityQuintals} Qtl</span>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(activeCentre.currentDayIntakeQuintals / activeCentre.dailyCapacityQuintals) * 100}%`,
                backgroundColor: '#4ade80',
                borderRadius: '4px'
              }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: '#e2e8f0', marginTop: '4px', display: 'block' }}>
              76.5% Daily Quota Achieved
            </span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-label">Farmers in Queue</span>
          <div className="stat-value tabular-nums">
            {waitingTokens.length}
          </div>
          <span className="stat-subtext">Staged across Holding Yard 1 &amp; 2</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Average Cycle Time</span>
          <div className="stat-value tabular-nums">
            16.2 <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>mins</span>
          </div>
          <span className="stat-subtext">Verification to Tare Weighment</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Active Weighing Counters</span>
          <div className="stat-value tabular-nums" style={{ color: 'var(--gov-green-700)' }}>
            {counters.filter(c => c.status === 'ACTIVE').length} / {counters.length}
          </div>
          <span className="stat-subtext">Dual 50T pitless weighbridges</span>
        </div>
      </div>

      {/* ==========================================================================
         VISUAL HIGHLIGHT #4: ACTIVE COUNTER COMMAND DESK
         ========================================================================== */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gov-slate-900)' }}>
              Counter Workload & Live Tokens
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--gov-slate-600)' }}>
              Real-time token dispatching across gate verification, weighbridges, moisture lab, and DBT cashier desks.
            </p>
          </div>

          <button
            className="gov-btn gov-btn-secondary gov-btn-sm"
            onClick={() => setStaffScreen('counters')}
          >
            Manage Counters
          </button>
        </div>

        <div className="counter-grid-container">
          {counters.map(counter => (
            <div key={counter.id} className={`counter-card ${counter.status === 'ACTIVE' ? 'active' : ''}`}>
              <div>
                <div className="counter-header-row">
                  <span className="counter-badge-number">
                    COUNTER {counter.number}
                  </span>
                  <span className="gov-badge gov-badge-green" style={{ fontSize: '0.65rem' }}>
                    <span className="pulse-dot green" />
                    {counter.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.94rem', color: 'var(--gov-slate-900)', minHeight: '40px' }}>
                  {counter.name}
                </h4>

                <div className="counter-current-serving-box">
                  <div style={{ fontSize: '0.7rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>
                    Currently Processing
                  </div>
                  <div className="counter-token-code tabular-nums">
                    {counter.currentServingToken}
                  </div>
                </div>

                <div className="counter-operator-text">
                  <Users size={13} />
                  <span>{counter.operatorName}</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
                  {counter.tokensProcessedToday} Tokens Processed Today
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--gov-border)' }}>
                <button
                  className="gov-btn gov-btn-primary gov-btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => callNextToken(counter.id)}
                >
                  <Play size={13} />
                  <span>Call Next to C-{counter.number}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Operational Queue Table */}
      <div className="staff-table-wrapper">
        <div className="staff-table-header-bar">
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--gov-slate-900)' }}>
              Active Farmers Queue Ledger
            </h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)' }}>
              Showing all staged vehicles in yard and current counter lots
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="gov-btn gov-btn-secondary gov-btn-sm"
              onClick={() => setStaffScreen('live-queue')}
            >
              Full Queue Manager &rarr;
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Token #</th>
                <th>Farmer Name</th>
                <th>Vehicle &amp; Plate</th>
                <th>Crop &amp; Quantity</th>
                <th>Moisture</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {centreTokens.slice(0, 6).map(token => (
                <tr key={token.id}>
                  <td className="mono tabular-nums" style={{ fontWeight: 700 }}>
                    {token.tokenNumber}
                  </td>
                  <td>
                    <strong>{token.farmerName}</strong>
                    <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{token.village}</div>
                  </td>
                  <td>
                    <div>{token.vehicleType}</div>
                    <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{token.vehicleNumber}</span>
                  </td>
                  <td>
                    <div>{token.quantityQuintals} Quintals</div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{token.crop.split('(')[0]}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: (token.moisturePercent || 14.5) > 17 ? 'var(--gov-earth-700)' : 'var(--gov-green-800)' }}>
                      {token.moisturePercent || 14.5}%
                    </span>
                  </td>
                  <td>
                    <span className={`gov-badge ${token.status === 'AT_COUNTER' ? 'gov-badge-green' : token.status === 'IN_INSPECTION' ? 'gov-badge-ochre' : 'gov-badge-slate'}`} style={{ fontSize: '0.68rem' }}>
                      {token.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <button
                      className="gov-btn gov-btn-secondary gov-btn-sm"
                      onClick={() => {
                        setSelectedBookingDetails(token);
                        setStaffScreen('queue-details');
                      }}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
