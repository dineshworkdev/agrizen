import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Building2,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';

export function AdminCentres() {
  const { centres, setAdminScreen, setSelectedCentreDetails, playChime, addToast } = useAgrizen();
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');

  const filteredCentres = centres.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.taluk.toLowerCase().includes(search.toLowerCase()) ||
                          c.code.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = districtFilter === 'ALL' || c.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  const handleSelectCentre = (c) => {
    setSelectedCentreDetails(c);
    setAdminScreen('centre-details');
  };

  const handleToggleEmergencyLock = (centreId, e) => {
    e.stopPropagation();
    playChime();
    addToast(`Centre ${centreId} intake quota locked by State Commissioner`, "warning");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
            Statewide Direct Procurement Centre Master
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Infrastructure monitoring, daily quota allocation, and emergency intake locks
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={15} color="var(--gov-slate-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="gov-input"
              style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
              placeholder="Search centre, taluk or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="gov-select"
            style={{ width: 'auto', fontSize: '0.85rem' }}
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="ALL">All Districts</option>
            <option value="Thanjavur">Thanjavur</option>
            <option value="Tiruvarur">Tiruvarur</option>
            <option value="Pudukkottai">Pudukkottai</option>
            <option value="Tiruchirappalli">Tiruchirappalli</option>
          </select>
        </div>
      </div>

      <div className="staff-table-wrapper">
        <div style={{ overflowX: 'auto' }}>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Procurement Centre Name</th>
                <th>District / Taluk</th>
                <th>Daily Intake</th>
                <th>Capacity Used</th>
                <th>Active Counters</th>
                <th>Avg Wait</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCentres.map(c => {
                const usedPct = Math.round((c.currentDayIntakeQuintals / c.dailyCapacityQuintals) * 100);
                return (
                  <tr key={c.id}>
                    <td className="mono" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                      {c.code}
                    </td>
                    <td>
                      <strong>{c.name}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>
                        Supervisor: {c.supervisor.name}
                      </div>
                    </td>
                    <td>
                      <div>{c.district}</div>
                      <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{c.taluk}</span>
                    </td>
                    <td className="tabular-nums" style={{ fontWeight: 700 }}>
                      {c.currentDayIntakeQuintals} / {c.dailyCapacityQuintals} Qtl
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--gov-slate-200)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${Math.min(100, usedPct)}%`,
                            height: '100%',
                            backgroundColor: usedPct > 85 ? 'var(--gov-ochre-600)' : 'var(--gov-green-700)'
                          }} />
                        </div>
                        <span className="tabular-nums" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{usedPct}%</span>
                      </div>
                    </td>
                    <td className="tabular-nums">
                      {c.activeCountersCount} Counters
                    </td>
                    <td className="tabular-nums" style={{ fontWeight: 700, color: c.averageWaitMinutes > 30 ? 'var(--gov-ochre-700)' : 'var(--gov-green-800)' }}>
                      ~{c.averageWaitMinutes} mins
                    </td>
                    <td>
                      <span className={`gov-badge ${c.status === 'HIGH_RUSH' ? 'gov-badge-ochre' : 'gov-badge-green'}`} style={{ fontSize: '0.65rem' }}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="gov-btn gov-btn-secondary gov-btn-sm"
                          onClick={() => handleSelectCentre(c)}
                        >
                          Audit
                        </button>
                        <button
                          className="gov-btn gov-btn-ghost gov-btn-sm"
                          onClick={(e) => handleToggleEmergencyLock(c.id, e)}
                          title="Lock new slot bookings"
                        >
                          Lock
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
