import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Activity,
  AlertTriangle,
  Building2,
  Clock,
  CheckCircle2,
  ChevronLeft,
  SunMedium,
  TrendingDown,
  RotateCw
} from 'lucide-react';

export function AdminQueueMonitoring() {
  const { centres, setAdminScreen, addToast, playChime } = useAgrizen();

  const handleManualSync = () => {
    playChime();
    addToast("Polled live queue sensors across 48 statewide DPCs", "info");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
            Cross-Centre Live Queue Delay Radar
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Real-time waiting-time telemetry and tractor backlog alerts across Cauvery Delta terminals
          </p>
        </div>

        <button className="gov-btn gov-btn-secondary gov-btn-sm" onClick={handleManualSync}>
          <RotateCw size={14} />
          <span>Sync All Sensors</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {centres.map(c => {
          const isHighRush = c.status === 'HIGH_RUSH';
          return (
            <div
              key={c.id}
              className="gov-card"
              style={{
                borderTop: isHighRush ? '4px solid var(--gov-earth-600)' : '4px solid var(--gov-green-600)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--gov-slate-900)' }}>
                    {c.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)' }}>
                    {c.taluk}, {c.district}
                  </div>
                </div>

                <span className={`gov-badge ${isHighRush ? 'gov-badge-earth' : 'gov-badge-green'}`} style={{ fontSize: '0.65rem' }}>
                  <span className={`pulse-dot ${isHighRush ? 'earth' : 'green'}`} />
                  {c.status}
                </span>
              </div>

              {/* Delay Meter */}
              <div style={{
                backgroundColor: 'var(--gov-slate-50)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                margin: '1rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Avg Wait Time</div>
                  <div className="tabular-nums" style={{ fontSize: '1.45rem', fontWeight: 800, color: isHighRush ? 'var(--gov-earth-700)' : 'var(--gov-green-800)' }}>
                    ~{c.averageWaitMinutes} mins
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Active Lots</div>
                  <div className="tabular-nums" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
                    {c.currentWaitingTokens} waiting
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Active Counters: <strong>{c.activeCountersCount} Operational</strong></div>
                <div>Today's Intake: <strong>{c.currentDayIntakeQuintals} / {c.dailyCapacityQuintals} Qtl</strong></div>
              </div>

              {c.weatherNotice?.alert && (
                <div style={{
                  fontSize: '0.74rem',
                  color: isHighRush ? 'var(--gov-earth-800)' : 'var(--gov-slate-600)',
                  backgroundColor: isHighRush ? 'var(--gov-earth-50)' : '#ffffff',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '0.75rem',
                  border: '1px solid var(--gov-border)'
                }}>
                  🌤️ {c.weatherNotice.alert}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
