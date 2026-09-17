import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  MapPin,
  Clock,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function FarmerCentres() {
  const { centres, setFarmerScreen, setSelectedCentreDetails, playChime } = useAgrizen();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCentres = centres.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.taluk.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectCentre = (c) => {
    playChime();
    setSelectedCentreDetails(c);
    setFarmerScreen('centre-details');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-slate">{filteredCentres.length} Centres Found</span>
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gov-slate-900)' }}>
          Direct Procurement Centres (DPCs)
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
          Find nearest TNCSC purchase hubs with live queue delays and drying yard infrastructure.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="var(--gov-slate-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="gov-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search centre name, taluk or village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="gov-select"
          style={{ width: 'auto' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="OPERATIONAL">Operational</option>
          <option value="HIGH_RUSH">High Rush</option>
        </select>
      </div>

      {/* Centres List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredCentres.map(c => (
          <div
            key={c.id}
            className="gov-card gov-card-interactive"
            onClick={() => handleSelectCentre(c)}
            style={{ padding: '1.1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
              <div>
                <h4 style={{ fontSize: '0.98rem', color: 'var(--gov-slate-900)' }}>
                  {c.name}
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
                  {c.address}, {c.taluk}
                </div>
              </div>
              <span className={`gov-badge ${c.status === 'HIGH_RUSH' ? 'gov-badge-ochre' : 'gov-badge-green'}`} style={{ fontSize: '0.68rem' }}>
                {c.status}
              </span>
            </div>

            {/* Metrics Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              backgroundColor: 'var(--gov-slate-50)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem 0.85rem',
              marginTop: '0.75rem',
              fontSize: '0.78rem'
            }}>
              <div>
                <span style={{ color: 'var(--gov-slate-500)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Distance</span>
                <div style={{ fontWeight: 700 }}>{c.distanceKm} km</div>
              </div>

              <div>
                <span style={{ color: 'var(--gov-slate-500)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Wait Time</span>
                <div style={{ fontWeight: 700, color: c.averageWaitMinutes > 30 ? 'var(--gov-ochre-700)' : 'var(--gov-green-800)' }}>
                  ~{c.averageWaitMinutes} mins
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--gov-slate-500)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Counters</span>
                <div style={{ fontWeight: 700 }}>{c.activeCountersCount} Active</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
              <span>Supervisor: <strong>{c.supervisor.name}</strong></span>
              <span style={{ color: 'var(--gov-green-700)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                View Facilities &amp; Rules &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
