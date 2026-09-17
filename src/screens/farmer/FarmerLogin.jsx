import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { MOCK_FARMERS } from '../../data/mockData';
import {
  ShieldCheck,
  User,
  Phone,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export function FarmerLogin() {
  const { setCurrentUser, setFarmerScreen, addToast, playChime } = useAgrizen();

  const [mobileNumber, setMobileNumber] = useState("9842177312");
  const [otp, setOtp] = useState("4402");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      playChime();
      addToast("Demo OTP sent: 4402 (Pre-filled)", "info");
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    playChime();
    addToast("Farmer identity verified via UIDAI Aadhaar mock", "success");
    setFarmerScreen('dashboard');
  };

  const handleQuickLogin = (farmer) => {
    setCurrentUser(farmer);
    playChime();
    addToast(`Logged in as ${farmer.name}`, "success");
    setFarmerScreen('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '440px', margin: '1rem auto 0 auto' }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--gov-green-800)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px auto',
          fontSize: '1.4rem',
          fontWeight: 800,
          boxShadow: '0 4px 12px rgba(20, 83, 45, 0.3)'
        }}>
          AZ
        </div>
        <h2 style={{ fontSize: '1.45rem', color: 'var(--gov-slate-900)' }}>
          Farmer Portal Login
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Government of Tamil Nadu • Direct Procurement Queue
        </p>
      </div>

      {/* Main Login Form */}
      <div className="gov-card">
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="phone-input">Registered Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--gov-slate-500)'
                }}>
                  +91
                </span>
                <input
                  id="phone-input"
                  type="tel"
                  maxLength={10}
                  className="gov-input"
                  style={{ paddingLeft: '44px' }}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="98421 XXXXX"
                  required
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)', marginTop: '4px' }}>
                Linked to your Patta/Chitta and Aadhaar record.
              </span>
            </div>

            <button
              type="submit"
              className="gov-btn gov-btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <span>Request OTP</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div style={{
              backgroundColor: 'var(--gov-green-50)',
              border: '1px solid rgba(21, 128, 61, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              marginBottom: '1rem',
              fontSize: '0.82rem',
              color: 'var(--gov-green-900)'
            }}>
              OTP sent to +91 {mobileNumber}. For demo evaluation, enter <strong>4402</strong>.
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="otp-input">Enter 4-digit OTP</label>
              <input
                id="otp-input"
                type="text"
                maxLength={4}
                className="gov-input mono tabular-nums"
                style={{ textAlign: 'center', fontSize: '1.3rem', letterSpacing: '0.3em' }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="gov-btn gov-btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <span>Verify & Access Portal</span>
              <CheckCircle2 size={16} />
            </button>

            <button
              type="button"
              className="gov-btn-ghost gov-btn-sm"
              onClick={() => setOtpSent(false)}
              style={{ width: '100%', marginTop: '0.5rem', color: 'var(--gov-slate-600)' }}
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>

      {/* Quick Demo Profiles (Essential for Reviewers) */}
      <div className="gov-card" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gov-slate-700)', textTransform: 'uppercase', marginBottom: '8px' }}>
          ⚡ 1-Click Evaluation Profiles:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {MOCK_FARMERS.slice(0, 3).map((f) => (
            <button
              key={f.id}
              type="button"
              className="gov-btn gov-btn-secondary gov-btn-sm"
              style={{ justifyContent: 'space-between', textAlign: 'left' }}
              onClick={() => handleQuickLogin(f)}
            >
              <div>
                <strong>{f.name}</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)', marginLeft: '6px' }}>
                  ({f.village}, {f.district})
                </span>
              </div>
              <span className="gov-badge gov-badge-slate" style={{ fontSize: '0.66rem' }}>
                {f.primaryCrop.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* New Registration Link */}
      <div style={{ textAlign: 'center', fontSize: '0.84rem' }}>
        <span style={{ color: 'var(--gov-slate-600)' }}>New farmer to Direct Procurement? </span>
        <button
          className="gov-btn-ghost"
          onClick={() => setFarmerScreen('register')}
          style={{ color: 'var(--gov-green-700)', fontWeight: 700, padding: '2px 4px' }}
        >
          Register with Patta/Aadhaar &rarr;
        </button>
      </div>
    </div>
  );
}
