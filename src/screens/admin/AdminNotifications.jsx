import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Bell,
  Send,
  AlertTriangle,
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';

export function AdminNotifications() {
  const { notifications, addToast, playChime } = useAgrizen();

  const [directiveTitle, setDirectiveTitle] = useState("");
  const [directiveMessage, setDirectiveMessage] = useState("");
  const [targetDistrict, setTargetDistrict] = useState("ALL");

  const adminNotifs = notifications.filter(n => n.targetRole === 'admin' || n.targetRole === 'all');

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!directiveTitle.trim()) return;
    playChime();
    addToast(`Directive broadcasted to all active DPCs in ${targetDistrict}!`, "success");
    setDirectiveTitle("");
    setDirectiveMessage("");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
          State Executive Directives &amp; Alerts
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
          Policy broadcasts, weather advisories, storage capacity alerts, and district audits
        </p>
      </div>

      {/* Broadcast New State Directive Form */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>
          Broadcast State Procurement Directive
        </h4>
        <p style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>
          Sends instant high-priority instruction to DPC Superintendents and Counter Clerks.
        </p>

        <form onSubmit={handleBroadcast}>
          <div className="grid-2">
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="dir-title">Directive Subject</label>
              <input
                id="dir-title"
                type="text"
                className="gov-input"
                required
                placeholder="e.g. Moisture Limit Relaxation Advisory (+1%)"
                value={directiveTitle}
                onChange={(e) => setDirectiveTitle(e.target.value)}
              />
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="dir-target">Target District</label>
              <select
                id="dir-target"
                className="gov-select"
                value={targetDistrict}
                onChange={(e) => setTargetDistrict(e.target.value)}
              >
                <option value="ALL">All Delta Districts (48 DPCs)</option>
                <option value="Thanjavur">Thanjavur District Only</option>
                <option value="Tiruvarur">Tiruvarur District Only</option>
                <option value="Nagapattinam">Nagapattinam District Only</option>
              </select>
            </div>
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="dir-msg">Directive Order Text</label>
            <textarea
              id="dir-msg"
              rows={2}
              className="gov-textarea"
              required
              placeholder="Enter official government directive instruction..."
              value={directiveMessage}
              onChange={(e) => setDirectiveMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="gov-btn gov-btn-primary">
            <Send size={15} />
            <span>Broadcast Directive to All Terminals</span>
          </button>
        </form>
      </div>

      {/* Active Notifications Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {adminNotifs.map(n => (
          <div
            key={n.id}
            className="gov-card"
            style={{
              borderLeft: n.priority === 'CRITICAL' ? '4px solid #ef4444' : '4px solid var(--gov-ochre-600)',
              padding: '1.1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '0.98rem', color: 'var(--gov-slate-900)' }}>
                {n.title}
              </h4>
              <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-400)' }}>
                {n.timestamp}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--gov-slate-700)', marginTop: '4px', lineHeight: 1.45 }}>
              {n.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
