import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  Activity,
  Users,
  Scale,
  Bell,
  BarChart2,
  Settings,
  User,
  Radio,
  FileText
} from 'lucide-react';

// Import All 13 Staff Screens
import { StaffLogin } from './StaffLogin';
import { StaffDashboard } from './StaffDashboard';
import { StaffLiveQueue } from './StaffLiveQueue';
import { StaffQueueDetails } from './StaffQueueDetails';
import { StaffFarmers } from './StaffFarmers';
import { StaffFarmerDetails } from './StaffFarmerDetails';
import { StaffCounters } from './StaffCounters';
import { StaffProcurement } from './StaffProcurement';
import { StaffProcurementDetails } from './StaffProcurementDetails';
import { StaffNotifications } from './StaffNotifications';
import { StaffAnalytics } from './StaffAnalytics';
import { StaffProfile } from './StaffProfile';
import { StaffSettings } from './StaffSettings';

export function StaffPortal() {
  const {
    staffScreen,
    setStaffScreen,
    activeCentre,
    setActiveCentreId,
    centres,
    notifications
  } = useAgrizen();

  const unreadNotifs = notifications.filter(n => (n.targetRole === 'staff' || n.targetRole === 'all') && !n.read).length;

  const renderScreen = () => {
    switch (staffScreen) {
      case 'login': return <StaffLogin />;
      case 'live-queue': return <StaffLiveQueue />;
      case 'queue-details': return <StaffQueueDetails />;
      case 'farmers': return <StaffFarmers />;
      case 'farmer-details': return <StaffFarmerDetails />;
      case 'counters': return <StaffCounters />;
      case 'procurement': return <StaffProcurement />;
      case 'procurement-details': return <StaffProcurementDetails />;
      case 'notifications': return <StaffNotifications />;
      case 'analytics': return <StaffAnalytics />;
      case 'profile': return <StaffProfile />;
      case 'settings': return <StaffSettings />;
      case 'dashboard':
      default:
        return <StaffDashboard />;
    }
  };

  return (
    <div className="staff-layout">
      {/* Staff Top Operations Bar */}
      <header className="staff-topbar">
        <div className="staff-topbar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => setStaffScreen('dashboard')}
            >
              <div className="gov-emblem-badge" style={{ width: '34px', height: '34px', fontSize: '0.95rem' }}>
                DPC
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--gov-slate-900)', lineHeight: 1.1 }}>
                  AGRIZEN STAFF
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>
                  Direct Procurement Centre Command Desk
                </div>
              </div>
            </div>

            {/* Centre Selector Dropdown */}
            <select
              className="gov-select"
              style={{ width: 'auto', fontSize: '0.82rem', padding: '4px 10px', marginLeft: '8px' }}
              value={activeCentre.id}
              onChange={(e) => setActiveCentreId(e.target.value)}
            >
              {centres.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.taluk})
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Nav Items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              className={`gov-btn-ghost gov-btn-sm ${staffScreen === 'dashboard' ? 'active' : ''}`}
              onClick={() => setStaffScreen('dashboard')}
            >
              Dashboard
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${staffScreen === 'live-queue' || staffScreen === 'queue-details' ? 'active' : ''}`}
              onClick={() => setStaffScreen('live-queue')}
            >
              Live Queue
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${staffScreen === 'counters' ? 'active' : ''}`}
              onClick={() => setStaffScreen('counters')}
            >
              Counters
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${staffScreen === 'procurement' || staffScreen === 'procurement-details' ? 'active' : ''}`}
              onClick={() => setStaffScreen('procurement')}
            >
              Weighment &amp; DBT
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${staffScreen === 'farmers' || staffScreen === 'farmer-details' ? 'active' : ''}`}
              onClick={() => setStaffScreen('farmers')}
            >
              Farmers
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${staffScreen === 'analytics' ? 'active' : ''}`}
              onClick={() => setStaffScreen('analytics')}
            >
              Analytics
            </button>

            <button
              className="gov-btn-ghost gov-btn-sm"
              onClick={() => setStaffScreen('notifications')}
              style={{ position: 'relative', padding: '6px 8px' }}
              aria-label="Staff notifications"
            >
              <Bell size={16} />
              {unreadNotifs > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gov-ochre-600)'
                }} />
              )}
            </button>

            <button
              className="gov-btn-ghost gov-btn-sm"
              onClick={() => setStaffScreen('settings')}
              style={{ padding: '6px 8px' }}
              aria-label="Staff settings"
            >
              <Settings size={16} />
            </button>
          </nav>
        </div>
      </header>

      {/* Staff Main View */}
      <main className="staff-main-container">
        {renderScreen()}
      </main>
    </div>
  );
}
