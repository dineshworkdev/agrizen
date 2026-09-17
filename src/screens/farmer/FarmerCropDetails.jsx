import React from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { MOCK_MSP_RATES } from '../../data/mockData';
import {
  Wheat,
  TrendingUp,
  Droplets,
  ShieldCheck,
  ChevronLeft,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export function FarmerCropDetails() {
  const { currentUser, setFarmerScreen } = useAgrizen();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">Kharif / Samba 2026-27</span>
      </div>

      {/* Hero Registered Crop Card */}
      <div className="gov-card" style={{ borderLeft: '4px solid var(--gov-green-700)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="gov-badge gov-badge-green" style={{ fontSize: '0.7rem' }}>
              REGISTERED PRIMARY CROP
            </span>
            <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>
              {currentUser.primaryCrop}
            </h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
              Cultivated Area: <strong>{currentUser.landAreaAcres} Acres</strong> • Expected Yield: <strong>{currentUser.estimatedYieldQuintals} Quintals</strong>
            </div>
          </div>
          <Wheat size={36} color="var(--gov-green-700)" />
        </div>
      </div>

      {/* Official Government MSP Rate Comparison Card */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--gov-green-700)" />
            <h4 style={{ fontSize: '0.95rem' }}>Official MSP Procurement Rates</h4>
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>Govt of Tamil Nadu</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MOCK_MSP_RATES.map(item => (
            <div
              key={item.cropCode}
              style={{
                backgroundColor: 'var(--gov-slate-50)',
                border: '1px solid var(--gov-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--gov-slate-900)' }}>
                  {item.cropName}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>
                  {item.tamilName} • Max Moisture: <strong>{item.maxMoistureAllowed}%</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-green-800)' }}>
                  ₹{item.netPayoutPerQuintal}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--gov-slate-500)' }}>
                  per Quintal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Moisture Acceptance Guidelines */}
      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
          <Droplets size={18} color="#0284c7" />
          <h4 style={{ fontSize: '0.95rem' }}>Moisture Specifications & Sun-Drying Rules</h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
          <div style={{
            backgroundColor: 'var(--gov-green-50)',
            border: '1px solid rgba(21, 128, 61, 0.2)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <strong style={{ color: 'var(--gov-green-900)' }}>&le; 17.0% Moisture (Standard Grade A):</strong>
            <p style={{ color: 'var(--gov-slate-700)', marginTop: '2px' }}>
              Directly weighed and unloaded. Full MSP of ₹2,420/Qtl without deductions.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--gov-ochre-50)',
            border: '1px solid rgba(217, 119, 6, 0.2)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <strong style={{ color: 'var(--gov-ochre-900)' }}>17.1% – 19.0% Moisture (Drying Yard Allowed):</strong>
            <p style={{ color: 'var(--gov-slate-700)', marginTop: '2px' }}>
              Farmer can spread lot on DPC concrete drying yard for 45-60 minutes to reduce moisture to 17.0% prior to official weighing.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--gov-earth-50)',
            border: '1px solid rgba(194, 65, 12, 0.2)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <strong style={{ color: 'var(--gov-earth-800)' }}>&gt; 19.0% Moisture (Re-drying Advisory):</strong>
            <p style={{ color: 'var(--gov-slate-700)', marginTop: '2px' }}>
              Lot must be sun-dried at village drying floor to avoid mill rejection and fungal contamination.
            </p>
          </div>
        </div>
      </div>

      <button
        className="gov-btn gov-btn-primary"
        onClick={() => setFarmerScreen('slot-booking')}
      >
        <span>Book Slot for {currentUser.primaryCrop.split(' ')[0]}</span>
      </button>
    </div>
  );
}
