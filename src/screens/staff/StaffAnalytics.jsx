import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  TrendingUp,
  BarChart2,
  Clock,
  Scale,
  Droplets,
  ChevronLeft,
  Calendar
} from 'lucide-react';

export function StaffAnalytics() {
  const { activeCentre, setStaffScreen } = useAgrizen();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setStaffScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">Operational Telemetry</span>
      </div>

      <div>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
          Centre Workload Analytics ({activeCentre.name})
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
          Real-time queue cycle times, hourly intake velocity, and moisture compliance rates
        </p>
      </div>

      {/* Hourly Intake Throughput Visualizer (Pure CSS Clean Visualization) */}
      <div className="chart-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--gov-slate-900)' }}>
            Hourly Intake Distribution (Quintals)
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>Today's Total: 382.5 Qtl</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '0.5rem' }}>
          {[
            { hour: "08:30 - 09:30", qtl: 62.0, pct: 68 },
            { hour: "09:30 - 10:30", qtl: 88.5, pct: 95 },
            { hour: "10:30 - 11:30", qtl: 95.0, pct: 100 },
            { hour: "11:30 - 12:30", qtl: 78.0, pct: 82 },
            { hour: "01:30 - 02:30", qtl: 59.0, pct: 62 }
          ].map(item => (
            <div key={item.hour} className="bar-chart-row">
              <div className="bar-chart-label mono tabular-nums">{item.hour}</div>
              <div className="bar-track">
                <div className="bar-fill green" style={{ width: `${item.pct}%` }}>
                  {item.qtl} Qtl
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage-wise Cycle Time Breakdown */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
          Average Cycle Duration by Stage (mins)
        </h4>

        <div className="grid-4">
          <div className="stat-card">
            <span className="stat-label">1. Gate Check</span>
            <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem' }}>2.4 min</div>
            <span className="stat-subtext">Patta & Aadhaar match</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">2. Gross Weigh</span>
            <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem' }}>4.1 min</div>
            <span className="stat-subtext">Pitless weighbridge</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">3. Moisture Lab</span>
            <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem' }}>3.8 min</div>
            <span className="stat-subtext">Digital probe test</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">4. Tare & DBT</span>
            <div className="stat-value tabular-nums" style={{ fontSize: '1.4rem', color: 'var(--gov-green-700)' }}>5.9 min</div>
            <span className="stat-subtext">Offloading & PFMS slip</span>
          </div>
        </div>
      </div>

      {/* Moisture Quality & Yard Compliance */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
          Paddy Moisture Compliance (NABL Standard &le; 17.0%)
        </h4>

        <div className="grid-3">
          <div style={{ backgroundColor: 'var(--gov-green-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(21, 128, 61, 0.2)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-green-800)', textTransform: 'uppercase' }}>Direct Pass (&le; 17.0%)</div>
            <div className="tabular-nums" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-green-900)' }}>
              88.4%
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-600)' }}>24 of 27 lots directly weighed</span>
          </div>

          <div style={{ backgroundColor: 'var(--gov-ochre-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-ochre-800)', textTransform: 'uppercase' }}>Yard Sun-Dried (17.1-19%)</div>
            <div className="tabular-nums" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-ochre-900)' }}>
              11.6%
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-600)' }}>3 lots dried for 45 mins</span>
          </div>

          <div style={{ backgroundColor: 'var(--gov-slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gov-border)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-slate-600)', textTransform: 'uppercase' }}>Total Rejections (&gt; 19%)</div>
            <div className="tabular-nums" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-slate-900)' }}>
              0.0%
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-600)' }}>Zero lots sent back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
