import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronLeft,
  MessageSquare
} from 'lucide-react';

export function FarmerNotifications() {
  const { notifications, setFarmerScreen } = useAgrizen();

  const farmerNotifs = notifications.filter(n => n.targetRole === 'farmer' || n.targetRole === 'all');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-slate">{farmerNotifs.length} Alerts</span>
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gov-slate-900)' }}>
          Notifications & SMS Inbox
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Real-time queue advance triggers, moisture alerts, and DBT payment credits.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {farmerNotifs.map(n => (
          <div
            key={n.id}
            className="gov-card"
            style={{
              borderLeft: n.priority === 'CRITICAL' ? '4px solid #ef4444' : n.priority === 'HIGH' ? '4px solid var(--gov-ochre-600)' : '4px solid var(--gov-green-700)',
              padding: '1.1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '0.96rem', color: 'var(--gov-slate-900)' }}>
                {n.title}
              </h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-400)', whiteSpace: 'nowrap' }}>
                {n.timestamp}
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--gov-slate-700)', marginTop: '4px', lineHeight: 1.4 }}>
              {n.message}
            </p>

            {n.tamilMessage && (
              <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-500)', marginTop: '4px', borderTop: '1px dashed var(--gov-border)', paddingTop: '4px' }}>
                {n.tamilMessage}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
