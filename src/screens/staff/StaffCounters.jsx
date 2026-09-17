import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  Users,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Scale,
  Droplets,
  CreditCard,
  Radio
} from 'lucide-react';

export function StaffCounters() {
  const { counters, activeCentre, callNextToken, addToast, playChime } = useAgrizen();

  const handleToggleCounter = (counterId, currentStatus) => {
    playChime();
    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    addToast(`Counter status changed to ${newStatus}`, "info");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
          Counter Operations &amp; Workstation Grid
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
          {activeCentre.name} • Gate verification, weighbridge, moisture inspection, and cashier dispatch units
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {counters.map(c => (
          <div
            key={c.id}
            className="gov-card"
            style={{
              borderLeft: c.status === 'ACTIVE' ? '4px solid var(--gov-green-600)' : '4px solid var(--gov-ochre-600)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="counter-badge-number">
                  COUNTER {c.number}
                </span>
                <span className={`gov-badge ${c.status === 'ACTIVE' ? 'gov-badge-green' : 'gov-badge-ochre'}`} style={{ fontSize: '0.68rem' }}>
                  <span className={`pulse-dot ${c.status === 'ACTIVE' ? 'green' : 'ochre'}`} />
                  {c.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: 'var(--gov-slate-900)' }}>
                {c.name}
              </h3>

              <div style={{
                backgroundColor: 'var(--gov-slate-50)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                margin: '0.75rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Current Lot Serving</div>
                  <div className="mono tabular-nums" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-green-800)' }}>
                    {c.currentServingToken}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gov-slate-500)', textTransform: 'uppercase' }}>Processed Today</div>
                  <div className="tabular-nums" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    {c.tokensProcessedToday} lots
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--gov-slate-600)' }}>
                Assigned Clerk: <strong>{c.operatorName}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
                Avg Processing Cycle: ~{Math.round(c.avgProcessingSeconds / 60)} minutes
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--gov-border)'
            }}>
              <button
                className="gov-btn gov-btn-primary gov-btn-sm"
                style={{ flex: 1 }}
                onClick={() => callNextToken(c.id)}
              >
                <Play size={13} />
                <span>Call Next Lot</span>
              </button>

              <button
                className="gov-btn gov-btn-secondary gov-btn-sm"
                onClick={() => handleToggleCounter(c.id, c.status)}
              >
                {c.status === 'ACTIVE' ? <Pause size={13} /> : <Play size={13} />}
                <span>{c.status === 'ACTIVE' ? 'Pause Counter' : 'Resume'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
