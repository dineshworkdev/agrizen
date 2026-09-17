import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  TrendingUp,
  BarChart2,
  Calendar,
  Scale,
  CreditCard,
  Building2,
  Download
} from 'lucide-react';

export function AdminAnalytics() {
  const { addToast, playChime } = useAgrizen();

  const handleExport = () => {
    playChime();
    addToast("Statewide procurement analytics data exported (CSV)", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
            Statewide Procurement Intelligence &amp; Analytics
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Empirical data monitoring across procurement targets, wait-time curves, and financial disbursals
          </p>
        </div>

        <button className="gov-btn gov-btn-secondary gov-btn-sm" onClick={handleExport}>
          <Download size={14} />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* Target Velocity & Seasonal Cumulative */}
      <div className="chart-container">
        <h4 style={{ fontSize: '1rem', color: 'var(--gov-slate-900)' }}>
          Kharif / Samba 2026 Procurement Cumulative Target Progress (Lakh Quintals)
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '0.5rem' }}>
          {[
            { dist: "Thanjavur District", current: 5.82, target: 7.50, pct: 77.6, color: "green" },
            { dist: "Tiruvarur District", current: 4.61, target: 6.00, pct: 76.8, color: "green" },
            { dist: "Nagapattinam District", current: 3.10, target: 4.50, pct: 68.8, color: "ochre" },
            { dist: "Mayiladuthurai District", current: 2.42, target: 3.20, pct: 75.6, color: "green" },
            { dist: "Tiruchirappalli District", current: 1.65, target: 2.80, pct: 58.9, color: "blue" },
            { dist: "Cuddalore District", current: 0.85, target: 2.20, pct: 38.6, color: "earth" }
          ].map(row => (
            <div key={row.dist} className="bar-chart-row">
              <div className="bar-chart-label" style={{ fontSize: '0.82rem' }}>{row.dist}</div>
              <div className="bar-track">
                <div className={`bar-fill ${row.color}`} style={{ width: `${row.pct}%` }}>
                  {row.current}L / {row.target}L ({row.pct}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wait Time Distribution Spectrum */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
          Statewide Farmer Waiting-Time Distribution Curve
        </h4>

        <div className="grid-4">
          <div className="stat-card">
            <span className="stat-label">&lt; 15 Minutes</span>
            <div className="stat-value tabular-nums" style={{ color: 'var(--gov-green-700)' }}>
              44.2%
            </div>
            <span className="stat-subtext">394 farmer lots today</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">15 – 30 Minutes</span>
            <div className="stat-value tabular-nums" style={{ color: 'var(--gov-green-700)' }}>
              36.8%
            </div>
            <span className="stat-subtext">328 farmer lots today</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">30 – 45 Minutes</span>
            <div className="stat-value tabular-nums" style={{ color: 'var(--gov-ochre-600)' }}>
              14.5%
            </div>
            <span className="stat-subtext">129 farmer lots today</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">&gt; 45 Minutes</span>
            <div className="stat-value tabular-nums" style={{ color: 'var(--gov-earth-700)' }}>
              4.5%
            </div>
            <span className="stat-subtext">41 lots (Bottleneck hubs)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
