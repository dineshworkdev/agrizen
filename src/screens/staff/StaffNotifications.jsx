import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export function StaffNotifications() {
  const { notifications, setStaffScreen } = useAgrizen();

  const staffNotifs = notifications.filter(n => n.targetRole === 'staff' || n.targetRole === 'all');

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
        <span className="gov-badge gov-badge-slate">{staffNotifs.length} Operations Alerts</span>
      </div>

      <div>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
          Staff Operations Alerts
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
          Yard logistics notices, moisture sensor calibrations, and shift handovers
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {staffNotifs.map(n => (
          <div
            key={n.id}
            className="gov-card"
            style={{
              borderLeft: n.priority === 'CRITICAL' ? '4px solid #ef4444' : n.priority === 'HIGH' ? '4px solid var(--gov-ochre-600)' : '4px solid var(--gov-green-700)',
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
