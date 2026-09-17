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
  Filter
} from 'lucide-react';

export function StaffFarmers() {
  const { setSelectedFarmerDetails, setStaffScreen } = useAgrizen();
  const [search, setSearch] = useState('');

  const filteredFarmers = MOCK_FARMERS.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.pattaNumber.toLowerCase().includes(search.toLowerCase()) ||
    f.mobile.includes(search) ||
    f.village.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectFarmer = (farmer) => {
    setSelectedFarmerDetails(farmer);
    setStaffScreen('farmer-details');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
            Registered Farmers Master (விவசாயிகள் பட்டியல்)
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Verified revenue landholders with active Aadhaar-linked DBT seeding
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--gov-slate-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="gov-input"
            style={{ paddingLeft: '32px' }}
            placeholder="Search by Name, Patta or Mobile..."
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
                <th>Village &amp; Taluk</th>
                <th>Patta No.</th>
                <th>Acres</th>
                <th>Crop Type</th>
                <th>DBT Bank</th>
                <th>KYC Status</th>
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
                    <div>{f.village}</div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{f.taluk}</span>
                  </td>
                  <td className="mono" style={{ fontWeight: 600 }}>
                    {f.pattaNumber}
                  </td>
                  <td className="tabular-nums" style={{ fontWeight: 700 }}>
                    {f.landAreaAcres}
                  </td>
                  <td>
                    {f.primaryCrop.split('(')[0]}
                  </td>
                  <td>
                    <div>{f.bankDetails.bankName}</div>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>{f.bankDetails.accountNumberMasked}</span>
                  </td>
                  <td>
                    <span className="gov-badge gov-badge-green" style={{ fontSize: '0.65rem' }}>
                      <ShieldCheck size={10} />
                      {f.kycStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="gov-btn gov-btn-secondary gov-btn-sm"
                      onClick={() => handleSelectFarmer(f)}
                    >
                      View Dossier
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
