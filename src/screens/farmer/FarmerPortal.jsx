import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Home,
  Activity,
  Ticket,
  Calendar,
  User,
  Bell,
  Globe,
  Wheat,
  Clock
} from 'lucide-react';

// Import All 18 Farmer Screens
import { FarmerLogin } from './FarmerLogin';
import { FarmerRegister } from './FarmerRegister';
import { FarmerLanguage } from './FarmerLanguage';
import { FarmerDashboard } from './FarmerDashboard';
import { FarmerProfile } from './FarmerProfile';
import { FarmerCropDetails } from './FarmerCropDetails';
import { FarmerCentres } from './FarmerCentres';
import { FarmerCentreDetails } from './FarmerCentreDetails';
import { FarmerSlotBooking } from './FarmerSlotBooking';
import { FarmerBookingConfirmation } from './FarmerBookingConfirmation';
import { FarmerDigitalToken } from './FarmerDigitalToken';
import { FarmerLiveQueue } from './FarmerLiveQueue';
import { FarmerETA } from './FarmerETA';
import { FarmerBookingHistory } from './FarmerBookingHistory';
import { FarmerBookingDetails } from './FarmerBookingDetails';
import { FarmerNotifications } from './FarmerNotifications';
import { FarmerHelp } from './FarmerHelp';
import { FarmerSettings } from './FarmerSettings';

export function FarmerPortal() {
  const {
    farmerScreen,
    setFarmerScreen,
    activeCentre,
    notifications,
    userToken
  } = useAgrizen();

  const unreadNotifs = notifications.filter(n => (n.targetRole === 'farmer' || n.targetRole === 'all') && !n.read).length;

  const renderScreen = () => {
    switch (farmerScreen) {
      case 'login': return <FarmerLogin />;
      case 'register': return <FarmerRegister />;
      case 'language': return <FarmerLanguage />;
      case 'profile': return <FarmerProfile />;
      case 'crop-details': return <FarmerCropDetails />;
      case 'centres': return <FarmerCentres />;
      case 'centre-details': return <FarmerCentreDetails />;
      case 'slot-booking': return <FarmerSlotBooking />;
      case 'booking-confirmation': return <FarmerBookingConfirmation />;
      case 'digital-token': return <FarmerDigitalToken />;
      case 'live-queue': return <FarmerLiveQueue />;
      case 'eta': return <FarmerETA />;
      case 'history': return <FarmerBookingHistory />;
      case 'booking-details': return <FarmerBookingDetails />;
      case 'notifications': return <FarmerNotifications />;
      case 'help': return <FarmerHelp />;
      case 'settings': return <FarmerSettings />;
      case 'dashboard':
      default:
        return <FarmerDashboard />;
    }
  };

  return (
    <div className="farmer-layout">
      {/* Mobile Top Header */}
      <header className="farmer-header">
        <div className="farmer-header-inner">
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            onClick={() => setFarmerScreen('dashboard')}
          >
            <div className="gov-emblem-badge" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
              AZ
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--gov-slate-900)', lineHeight: 1.1 }}>
                AGRIZEN
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--gov-slate-500)' }}>
                {activeCentre.taluk} DPC Queue
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              className="gov-btn-ghost gov-btn-sm"
              onClick={() => setFarmerScreen('notifications')}
              style={{ position: 'relative', padding: '6px' }}
              aria-label="View notifications"
            >
              <Bell size={18} color="var(--gov-slate-700)" />
              {unreadNotifs > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gov-ochre-600)'
                }} />
              )}
            </button>

            <button
              className="gov-btn-ghost gov-btn-sm"
              onClick={() => setFarmerScreen('language')}
              style={{ padding: '6px' }}
              aria-label="Select language"
            >
              <Globe size={18} color="var(--gov-slate-700)" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="farmer-content-area">
        {renderScreen()}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="farmer-bottom-nav" aria-label="Farmer Mobile Navigation">
        <button
          className={`farmer-nav-item ${farmerScreen === 'dashboard' ? 'active' : ''}`}
          onClick={() => setFarmerScreen('dashboard')}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button
          className={`farmer-nav-item ${farmerScreen === 'live-queue' ? 'active' : ''}`}
          onClick={() => setFarmerScreen('live-queue')}
        >
          <Activity size={20} />
          <span>Queue</span>
        </button>

        <button
          className={`farmer-nav-item ${farmerScreen === 'digital-token' ? 'active' : ''}`}
          onClick={() => setFarmerScreen('digital-token')}
        >
          <Ticket size={20} />
          <span>Token</span>
        </button>

        <button
          className={`farmer-nav-item ${farmerScreen === 'slot-booking' ? 'active' : ''}`}
          onClick={() => setFarmerScreen('slot-booking')}
        >
          <Calendar size={20} />
          <span>Book</span>
        </button>

        <button
          className={`farmer-nav-item ${farmerScreen === 'profile' || farmerScreen === 'settings' ? 'active' : ''}`}
          onClick={() => setFarmerScreen('profile')}
        >
          <User size={20} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
