import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Settings,
  Building2,
  Clock,
  Volume2,
  Bell,
  Scale,
  ChevronLeft
} from 'lucide-react';

export function StaffSettings() {
  const { activeCentre, setStaffScreen, addToast, playChime } = useAgrizen();

  const [dailyCap, setDailyCap] = useState(activeCentre.dailyCapacityQuintals);
  const [openingTime, setOpeningTime] = useState("08:30");
  const [closingTime, setClosingTime] = useState("17:30");
  const [audioChimes, setAudioChimes] = useState(true);
  const [autoSms, setAutoSms] = useState(true);

  const handleSave = () => {
    playChime();
    addToast("Centre operational parameters updated", "success");
    setStaffScreen('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setStaffScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-slate">DPC Configuration</span>
      </div>

      <div>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
          Centre Operating Parameters ({activeCentre.name})
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
          Set daily intake caps, weighing operating windows, and audio chime volume
        </p>
      </div>

      <div className="gov-card">
        <div className="gov-form-group">
          <label className="gov-label" htmlFor="daily-cap">Daily Procurement Intake Limit (Quintals)</label>
          <input
            id="daily-cap"
            type="number"
            className="gov-input mono"
            value={dailyCap}
            onChange={(e) => setDailyCap(Number(e.target.value))}
          />
          <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>
            Quota allotted by District Collectorate Thanjavur.
          </span>
        </div>

        <div className="grid-2">
          <div className="gov-form-group">
            <label className="gov-label" htmlFor="open-time">Weighbridge Open Time</label>
            <input
              id="open-time"
              type="time"
              className="gov-input"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
            />
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="close-time">Weighbridge Close Time</label>
            <input
              id="close-time"
              type="time"
              className="gov-input"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gov-border)' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Automated Turn PA Chimes</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>Sound public announcement tone when calling next token</div>
            </div>
            <input
              type="checkbox"
              checked={audioChimes}
              onChange={(e) => setAudioChimes(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Automated Farmer SMS Gateway</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>Dispatch SMS to farmer 20 mins before expected counter call</div>
            </div>
            <input
              type="checkbox"
              checked={autoSms}
              onChange={(e) => setAutoSms(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </label>
        </div>
      </div>

      <button className="gov-btn gov-btn-primary" onClick={handleSave}>
        <span>Save Centre Configuration</span>
      </button>
    </div>
  );
}
