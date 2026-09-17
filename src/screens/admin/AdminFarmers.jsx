import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { MOCK_FARMERS } from '../../data/mockData';
import {
  Users,
  Search,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ArrowRight,
  Filter,
  CreditCard
} from 'lucide-react';

export function AdminFarmers() {
  const { setSelectedFarmerDetails, setAdminScreen } = useAgrizen();
  const [search, setSearch] = useState('');

  const filteredFarmers = MOCK_FARMERS.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.pattaNumber.toLowerCase().includes(search.toLowerCase()) ||
    f.district.toLowerCase().includes(search.toLowerCase()) ||
    f.mobile.includes(search)
  );

  const handleSelectFarmer = (farmer) => {
    setSelectedFarmerDetails(farmer);
    setAdminScreen('farmer-details');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
            Statewide Master Farmer Registry
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Direct Benefit Transfer (DBT) verification database across Tamil Nadu agricultural districts
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="var(--gov-slate-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="gov-input"
            style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
            placeholder="Search by name, district, patta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="staff-table-wrapper">
        <div style={{ overflowX: 'auto' }}>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Farmer Name</th>
                <th>District / Taluk</th>
                <th>Patta #</th>
                <th>Acres</th>
                <th>Lifetime Intake</th>
                <th>Total DBT Disbursed</th>
                <th>NPCI Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map(f => (
                <tr key={f.id}>
                  <td className="mono" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                    {f.id}
                  </td>
                  <td>
                    <strong>{f.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>{f.tamilName}</div>
                  </td>
                  <td>
                    <div>{f.district}</div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{f.village}</span>
                  </td>
                  <td className="mono" style={{ fontWeight: 600 }}>
                    {f.pattaNumber}
                  </td>
                  <td className="tabular-nums" style={{ fontWeight: 700 }}>
                    {f.landAreaAcres}
                  </td>
                  <td className="tabular-nums" style={{ fontWeight: 700 }}>
                    {f.totalProcuredLifetime} Qtl
                  </td>
                  <td className="tabular-nums" style={{ fontWeight: 700, color: 'var(--gov-green-800)' }}>
                    ₹{f.totalDisbursedLifetime.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className="gov-badge gov-badge-green" style={{ fontSize: '0.65rem' }}>
                      <ShieldCheck size={10} />
                      Aadhaar Seeded
                    </span>
                  </td>
                  <td>
                    <button
                      className="gov-btn gov-btn-secondary gov-btn-sm"
                      onClick={() => handleSelectFarmer(f)}
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
