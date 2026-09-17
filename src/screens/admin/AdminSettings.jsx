import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { MOCK_MSP_RATES } from '../../data/mockData';
import {
  Settings,
  ShieldCheck,
  TrendingUp,
  Calendar,
  Save,
  CheckCircle2
} from 'lucide-react';

export function AdminSettings() {
  const { addToast, playChime } = useAgrizen();

  const [mspRates, setMspRates] = useState(MOCK_MSP_RATES);
  const [seasonName, setSeasonName] = useState("Kharif / Samba 2026-27");
  const [maxMoisture, setMaxMoisture] = useState("17.0");

  const handleUpdateRate = (index, field, value) => {
    const updated = [...mspRates];
    updated[index][field] = Number(value) || 0;
    updated[index].netPayoutPerQuintal = (updated[index].mspPerQuintal || 0) + (updated[index].stateBonusPerQuintal || 0);
    setMspRates(updated);
  };

  const handleSave = () => {
    playChime();
    addToast("State MSP Rate Master and season parameters updated successfully!", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
          State Procurement Policy &amp; Rate Master Configuration
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
          Configure government Minimum Support Price (MSP), state bonus incentive, and quality moisture limits
        </p>
      </div>

      {/* Season Configuration */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
          Procurement Season &amp; Quality Parameters
        </h4>

        <div className="grid-2">
          <div className="gov-form-group">
            <label className="gov-label" htmlFor="season-name">Current Active Season</label>
            <input
              id="season-name"
              type="text"
              className="gov-input"
              value={seasonName}
              onChange={(e) => setSeasonName(e.target.value)}
            />
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="max-moisture">Statewide Maximum Permissible Moisture (%)</label>
            <input
              id="max-moisture"
              type="number"
              step="0.1"
              className="gov-input"
              value={maxMoisture}
              onChange={(e) => setMaxMoisture(e.target.value)}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>Standard Central Government GOI guideline is 17.0%.</span>
          </div>
        </div>
      </div>

      {/* MSP Rates Master Table */}
      <div className="staff-table-wrapper">
        <div className="staff-table-header-bar">
          <h4 style={{ fontSize: '1rem', color: 'var(--gov-slate-900)' }}>
            Official MSP &amp; State Bonus Incentive Schedule
          </h4>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Crop Variety</th>
                <th>Base Central MSP (₹/Qtl)</th>
                <th>TN State Bonus (₹/Qtl)</th>
                <th>Net Farmer Payout (₹/Qtl)</th>
                <th>Max Moisture Allowed</th>
              </tr>
            </thead>
            <tbody>
              {mspRates.map((item, idx) => (
                <tr key={item.cropCode}>
                  <td>
                    <strong>{item.cropName}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>{item.tamilName}</div>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="gov-input mono tabular-nums"
                      style={{ width: '120px', padding: '4px 8px', fontSize: '0.85rem' }}
                      value={item.mspPerQuintal}
                      onChange={(e) => handleUpdateRate(idx, 'mspPerQuintal', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="gov-input mono tabular-nums"
                      style={{ width: '100px', padding: '4px 8px', fontSize: '0.85rem' }}
                      value={item.stateBonusPerQuintal}
                      onChange={(e) => handleUpdateRate(idx, 'stateBonusPerQuintal', e.target.value)}
                    />
                  </td>
                  <td>
                    <strong className="mono tabular-nums" style={{ fontSize: '1.1rem', color: 'var(--gov-green-800)' }}>
                      ₹{item.netPayoutPerQuintal}
                    </strong>
                  </td>
                  <td>
                    <span className="tabular-nums" style={{ fontWeight: 600 }}>{item.maxMoistureAllowed}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="gov-btn gov-btn-primary gov-btn-lg" onClick={handleSave}>
        <Save size={18} />
        <span>Save &amp; Commit Policy Changes</span>
      </button>
    </div>
  );
}
