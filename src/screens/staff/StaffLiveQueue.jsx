import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Activity,
  Play,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Scale,
  Droplets,
  AlertCircle
} from 'lucide-react';

export function StaffLiveQueue() {
  const {
    tokens,
    activeCentre,
    callNextToken,
    advanceTokenStatus,
    setSelectedBookingDetails,
    setStaffScreen,
    addToast,
    playChime
  } = useAgrizen();

  const [activeTab, setActiveTab] = useState('ALL'); // ALL, IN_QUEUE, AT_COUNTER, COMPLETED
  const [search, setSearch] = useState('');

  const centreTokens = tokens.filter(t => t.centreId === activeCentre.id);

  const filteredTokens = centreTokens.filter(t => {
    const matchesTab = activeTab === 'ALL' ||
      (activeTab === 'IN_QUEUE' && t.status === 'IN_QUEUE') ||
      (activeTab === 'AT_COUNTER' && (t.status === 'AT_COUNTER' || t.status === 'IN_INSPECTION')) ||
      (activeTab === 'COMPLETED' && t.status === 'COMPLETED');

    const matchesSearch = t.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      t.vehicleNumber.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
            Live Queue Management
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            {activeCentre.name} • Direct tractor staging and counter calling console
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="gov-btn gov-btn-primary"
            onClick={() => callNextToken("CTR-01")}
          >
            <Play size={16} />
            <span>Call Next to Counter 1</span>
          </button>
          <button
            className="gov-btn gov-btn-ochre"
            onClick={() => callNextToken("CTR-03")}
          >
            <Droplets size={16} />
            <span>Call Next to Moisture Lab</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div className="gov-tabs-container" style={{ margin: 0, border: 'none' }}>
          {[
            { id: 'ALL', label: 'All Lots', count: centreTokens.length },
            { id: 'IN_QUEUE', label: 'Waiting in Yard', count: centreTokens.filter(t => t.status === 'IN_QUEUE').length },
            { id: 'AT_COUNTER', label: 'Processing at Counters', count: centreTokens.filter(t => t.status === 'AT_COUNTER' || t.status === 'IN_INSPECTION').length },
            { id: 'COMPLETED', label: 'Completed Today', count: centreTokens.filter(t => t.status === 'COMPLETED').length }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`gov-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="gov-badge gov-badge-slate" style={{ fontSize: '0.66rem', padding: '2px 6px' }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={15} color="var(--gov-slate-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="gov-input"
            style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
            placeholder="Search token, farmer or vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Queue Table */}
      <div className="staff-table-wrapper">
        <div style={{ overflowX: 'auto' }}>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Queue #</th>
                <th>Token Code</th>
                <th>Farmer Name</th>
                <th>Crop Variety</th>
                <th>Quantity</th>
                <th>Vehicle Plate</th>
                <th>Moisture %</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '2rem' }}>
                    No lots matching active filters.
                  </td>
                </tr>
              ) : (
                filteredTokens.map((t, idx) => (
                  <tr key={t.id}>
                    <td>
                      <span className="gov-badge gov-badge-slate tabular-nums" style={{ fontWeight: 800 }}>
                        {t.queuePosition > 0 ? `#${t.queuePosition}` : 'Active'}
                      </span>
                    </td>
                    <td className="mono tabular-nums" style={{ fontWeight: 700, color: 'var(--gov-green-800)' }}>
                      {t.tokenNumber}
                    </td>
                    <td>
                      <strong>{t.farmerName}</strong>
                      <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>
                        {t.village} • Patta: {t.patta || "184/2A"}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{t.crop.split('(')[0]}</div>
                    </td>
                    <td className="tabular-nums" style={{ fontWeight: 700 }}>
                      {t.quantityQuintals} Qtl
                    </td>
                    <td>
                      <div>{t.vehicleType}</div>
                      <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{t.vehicleNumber}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: (t.moisturePercent || 14.5) > 17 ? 'var(--gov-earth-700)' : 'var(--gov-green-800)' }}>
                        {t.moisturePercent || 14.5}%
                      </span>
                    </td>
                    <td>
                      <span className={`gov-badge ${t.status === 'AT_COUNTER' ? 'gov-badge-green' : t.status === 'IN_INSPECTION' ? 'gov-badge-ochre' : 'gov-badge-slate'}`} style={{ fontSize: '0.68rem' }}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="gov-btn gov-btn-secondary gov-btn-sm"
                          onClick={() => {
                            setSelectedBookingDetails(t);
                            setStaffScreen('queue-details');
                          }}
                        >
                          Inspect
                        </button>

                        {t.status === 'IN_QUEUE' && (
                          <button
                            className="gov-btn gov-btn-primary gov-btn-sm"
                            onClick={() => callNextToken("CTR-02")}
                          >
                            Call
                          </button>
                        )}

                        {t.status === 'AT_COUNTER' && (
                          <button
                            className="gov-btn gov-btn-ochre gov-btn-sm"
                            onClick={() => advanceTokenStatus(t.id, 'IN_INSPECTION')}
                          >
                            Moisture Lab
                          </button>
                        )}

                        {t.status === 'IN_INSPECTION' && (
                          <button
                            className="gov-btn gov-btn-primary gov-btn-sm"
                            onClick={() => advanceTokenStatus(t.id, 'COMPLETED')}
                          >
                            Complete DBT
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
