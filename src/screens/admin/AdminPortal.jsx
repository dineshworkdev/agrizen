import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  ShieldCheck,
  Building2,
  Users,
  Activity,
  BarChart2,
  FileText,
  Bell,
  Settings,
  Calendar,
  Layers
} from 'lucide-react';

// Import All 12 Admin Screens
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminCentres } from './AdminCentres';
import { AdminCentreDetails } from './AdminCentreDetails';
import { AdminFarmers } from './AdminFarmers';
import { AdminFarmerDetails } from './AdminFarmerDetails';
import { AdminBookings } from './AdminBookings';
import { AdminQueueMonitoring } from './AdminQueueMonitoring';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminReports } from './AdminReports';
import { AdminNotifications } from './AdminNotifications';
import { AdminSettings } from './AdminSettings';

export function AdminPortal() {
  const {
    adminScreen,
    setAdminScreen,
    notifications
  } = useAgrizen();

  const unreadNotifs = notifications.filter(n => (n.targetRole === 'admin' || n.targetRole === 'all') && !n.read).length;

  const renderScreen = () => {
    switch (adminScreen) {
      case 'login': return <AdminLogin />;
      case 'centres': return <AdminCentres />;
      case 'centre-details': return <AdminCentreDetails />;
      case 'farmers': return <AdminFarmers />;
      case 'farmer-details': return <AdminFarmerDetails />;
      case 'bookings': return <AdminBookings />;
      case 'queue-monitoring': return <AdminQueueMonitoring />;
      case 'analytics': return <AdminAnalytics />;
      case 'reports': return <AdminReports />;
      case 'notifications': return <AdminNotifications />;
      case 'settings': return <AdminSettings />;
      case 'dashboard':
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Admin Top Navigation Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => setAdminScreen('dashboard')}
          >
            <div className="gov-emblem-badge" style={{ backgroundColor: 'var(--gov-slate-900)', width: '36px', height: '36px' }}>
              TN
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gov-slate-900)', lineHeight: 1.1 }}>
                AGRIZEN STATE MONITOR
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>
                Tamil Nadu Civil Supplies Corporation • HQ Directorate
              </div>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              className={`gov-btn-ghost gov-btn-sm ${adminScreen === 'dashboard' ? 'active' : ''}`}
              onClick={() => setAdminScreen('dashboard')}
            >
              Dashboard
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${adminScreen === 'queue-monitoring' ? 'active' : ''}`}
              onClick={() => setAdminScreen('queue-monitoring')}
            >
              Queue Radar
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${adminScreen === 'centres' || adminScreen === 'centre-details' ? 'active' : ''}`}
              onClick={() => setAdminScreen('centres')}
            >
              Centres
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${adminScreen === 'farmers' || adminScreen === 'farmer-details' ? 'active' : ''}`}
              onClick={() => setAdminScreen('farmers')}
            >
              Farmers Master
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${adminScreen === 'bookings' ? 'active' : ''}`}
              onClick={() => setAdminScreen('bookings')}
            >
              Bookings
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${adminScreen === 'analytics' ? 'active' : ''}`}
              onClick={() => setAdminScreen('analytics')}
            >
              Analytics
            </button>

            <button
              className={`gov-btn-ghost gov-btn-sm ${adminScreen === 'reports' ? 'active' : ''}`}
              onClick={() => setAdminScreen('reports')}
            >
              Reports &amp; DPR
            </button>

            <button
              className="gov-btn-ghost gov-btn-sm"
              onClick={() => setAdminScreen('notifications')}
              style={{ position: 'relative', padding: '6px 8px' }}
              aria-label="Admin notifications"
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
              onClick={() => setAdminScreen('settings')}
              style={{ padding: '6px 8px' }}
              aria-label="Admin settings"
            >
              <Settings size={16} />
            </button>
          </nav>
        </div>
      </header>

      {/* Admin Content Container */}
      <main className="admin-main-container">
        {renderScreen()}
      </main>
    </div>
  );
}
