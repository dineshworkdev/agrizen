import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { MOCK_ADMIN_DISTRICTS } from '../../data/mockData';
import {
  ShieldCheck,
  Building2,
  Users,
  Scale,
  CreditCard,
  AlertTriangle,
  ArrowRight,
  Download,
  TrendingUp,
  FileSpreadsheet,
  Activity,
  CheckCircle2
} from 'lucide-react';

export function AdminDashboard() {
  const { setAdminScreen, addToast, playChime } = useAgrizen();

  const handleExportDPR = () => {
    playChime();
    addToast("Statewide Daily Procurement Report (DPR) generated (1.4 MB)", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* State Executive Top Header */}
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
              STATE PROCUREMENT COMMAND CONSOLE
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--gov-slate-500)' }}>
              Tamil Nadu Civil Supplies Corporation (TNCSC)
            </span>
          </div>

          <h2 style={{ fontSize: '1.45rem', marginTop: '4px', color: 'var(--gov-slate-900)' }}>
            Cauvery Delta &amp; State e-Procurement Grid
          </h2>
          <div style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Live Monitoring Season: <strong>Kharif / Samba 2026-27</strong> • Automated PFMS / APBS Payment Settlement
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="gov-btn gov-btn-primary"
            onClick={handleExportDPR}
          >
            <Download size={16} />
            <span>Download Today's DPR</span>
          </button>

          <button
            className="gov-btn gov-btn-secondary"
            onClick={() => setAdminScreen('queue-monitoring')}
          >
            <Activity size={16} />
            <span>Cross-Centre Delay Radar</span>
          </button>
        </div>
      </div>

      {/* Statewide Macro KPI Grid */}
      <div className="admin-kpi-grid">
        <div className="stat-card" style={{ borderLeft: '4px solid var(--gov-green-700)' }}>
          <span className="stat-label">Active DPC Centres</span>
          <div className="stat-value tabular-nums" style={{ color: 'var(--gov-green-900)' }}>
            44 <span style={{ fontSize: '1.05rem', color: 'var(--gov-slate-500)', fontWeight: 600 }}>/ 48</span>
          </div>
          <span className="stat-subtext">4 on stand-by buffer</span>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #0284c7' }}>
          <span className="stat-label">Procured Today</span>
          <div className="stat-value tabular-nums">
            18,450 <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Qtl</span>
          </div>
          <span className="stat-subtext">Grade A &amp; Common Paddy</span>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid var(--gov-green-600)' }}>
          <span className="stat-label">DBT Disbursed (24h)</span>
          <div className="stat-value tabular-nums" style={{ color: 'var(--gov-green-800)' }}>
            ₹4.28 <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Cr</span>
          </div>
          <span className="stat-subtext">Direct to farmer accounts</span>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid var(--gov-ochre-600)' }}>
          <span className="stat-label">Farmers Served</span>
          <div className="stat-value tabular-nums">
            892
          </div>
          <span className="stat-subtext">Today across Delta DPCs</span>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <span className="stat-label">DBT Success Rate</span>
          <div className="stat-value tabular-nums" style={{ color: 'var(--gov-green-800)' }}>
            98.2%
          </div>
          <span className="stat-subtext">Zero NPCI mismatch faults</span>
        </div>
      </div>

      {/* Critical Bottleneck Alert Notice */}
      <div className="bottleneck-alert-box">
        <AlertTriangle size={22} color="var(--gov-earth-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-earth-900)' }}>
            Bottleneck Anomaly Detected: Orathanadu Model DPC &amp; Cuddalore Basin
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-earth-800)', marginTop: '2px', lineHeight: 1.45 }}>
            Orathanadu Model DPC has exceeded 88% daily intake capacity (440/500 Qtl) with average wait times reaching 38 mins. Standby trailer staging buffer activated; new slot bookings automatically diverted to Thanjavur South Central DPC (4.8 km away).
          </p>
        </div>
      </div>

      {/* ==========================================================================
         VISUAL HIGHLIGHT #5: DISTRICT QUEUE & BACKLOG RADAR
         ========================================================================== */}
      <div className="district-radar-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gov-slate-900)' }}>
              District Queue Performance &amp; Wait Time Radar
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--gov-slate-600)' }}>
              Statewide real-time tracking across 6 key Delta procurement zones
            </p>
          </div>

          <span className="gov-badge gov-badge-slate">
            Auto-refreshes every 30s
          </span>
        </div>

        <div className="district-radar-grid">
          {MOCK_ADMIN_DISTRICTS.map(dist => (
            <div key={dist.district} className="district-item-card">
              <div className="district-header">
                <div className="district-name">{dist.district}</div>
                <span className={`gov-badge ${dist.status === 'HIGH_BACKLOG' ? 'gov-badge-earth' : dist.status === 'MODERATE' ? 'gov-badge-ochre' : 'gov-badge-green'}`} style={{ fontSize: '0.65rem' }}>
                  {dist.status}
                </span>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)' }}>
                {dist.activeCentres} Active DPCs • {dist.activeFarmers} Farmers In-Queue
              </div>

              {/* Progress bar towards daily target */}
              <div style={{ marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--gov-slate-500)', marginBottom: '3px' }}>
                  <span>Procured: <strong>{dist.intakeTodayQuintals} Qtl</strong></span>
                  <span>Target: {dist.targetQuintals} Qtl</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--gov-slate-200)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, (dist.intakeTodayQuintals / dist.targetQuintals) * 100)}%`,
                    backgroundColor: dist.status === 'HIGH_BACKLOG' ? 'var(--gov-earth-600)' : 'var(--gov-green-700)',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '6px',
                borderTop: '1px solid var(--gov-border)',
                fontSize: '0.76rem',
                marginTop: '4px'
              }}>
                <span>Avg Wait: <strong style={{ color: dist.avgWaitMinutes > 30 ? 'var(--gov-ochre-700)' : 'var(--gov-green-800)' }}>{dist.avgWaitMinutes} mins</strong></span>
                <span>DBT: <strong>₹{dist.dbtDisbursedLakhs} L</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Visualization: Variety Share & Daily Velocity */}
      <div className="grid-2">
        <div className="chart-container">
          <h4 style={{ fontSize: '1rem', color: 'var(--gov-slate-900)' }}>
            Paddy Variety Procurement Share
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: "Paddy Grade A (Ponni / Samba)", share: 52, color: "green" },
              { name: "Paddy Common (BPT 5204 / ADT)", share: 34, color: "ochre" },
              { name: "CR 1009 Submerged Tolerant", share: 10, color: "blue" },
              { name: "Millets & Pulses", share: 4, color: "earth" }
            ].map(v => (
              <div key={v.name} className="bar-chart-row">
                <div className="bar-chart-label" style={{ fontSize: '0.8rem' }}>{v.name.split('(')[0]}</div>
                <div className="bar-track">
                  <div className={`bar-fill ${v.color}`} style={{ width: `${v.share}%` }}>
                    {v.share}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h4 style={{ fontSize: '1rem', color: 'var(--gov-slate-900)' }}>
            Storage Depots Capacity Utilization
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: "Thanjavur Central Godown", used: "88%", cap: "50,000 MT", color: "ochre" },
              { name: "Kumbakonam Buffer Silo", used: "64%", cap: "35,000 MT", color: "green" },
              { name: "Tiruvarur Railhead Terminal", used: "71%", cap: "40,000 MT", color: "green" },
              { name: "Trichy Regional Depot", used: "45%", cap: "60,000 MT", color: "green" }
            ].map(g => (
              <div key={g.name} className="bar-chart-row">
                <div className="bar-chart-label" style={{ fontSize: '0.8rem' }}>{g.name.split(' ')[0]} {g.name.split(' ')[1]}</div>
                <div className="bar-track">
                  <div className={`bar-fill ${g.color}`} style={{ width: g.used }}>
                    {g.used}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
