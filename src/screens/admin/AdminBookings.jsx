import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Calendar,
  Search,
  Filter,
  ChevronLeft,
  Building2,
  Scale,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export function AdminBookings() {
  const { tokens, setAdminScreen } = useAgrizen();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTokens = tokens.filter(t => {
    const matchesSearch = t.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      t.centreName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
            Statewide Slot Booking Ledger
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
            Universal queue ledger tracking tokens across all direct procurement stations
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={15} color="var(--gov-slate-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="gov-input"
              style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
              placeholder="Search token, centre or farmer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="gov-select"
            style={{ width: 'auto', fontSize: '0.85rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="IN_QUEUE">In Queue</option>
            <option value="AT_COUNTER">At Counter</option>
            <option value="IN_INSPECTION">In Inspection</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <div className="staff-table-wrapper">
        <div style={{ overflowX: 'auto' }}>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Token Code</th>
                <th>Procurement Centre</th>
                <th>Farmer Name</th>
                <th>Crop &amp; Qtl</th>
                <th>Slot Time Window</th>
                <th>Recommended Arrival</th>
                <th>Status</th>
                <th>DBT Est. Payout</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.map(t => (
                <tr key={t.id}>
                  <td className="mono tabular-nums" style={{ fontWeight: 700, color: 'var(--gov-green-800)' }}>
                    {t.tokenNumber}
                  </td>
                  <td>
                    <strong>{t.centreName}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>{t.centreId}</div>
                  </td>
                  <td>
                    <strong>{t.farmerName}</strong>
                    <div style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{t.village}</div>
                  </td>
                  <td>
                    <div>{t.quantityQuintals} Qtl</div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>{t.crop.split('(')[0]}</span>
                  </td>
                  <td className="tabular-nums">
                    {t.slotDate}<br />
                    <span style={{ fontSize: '0.74rem', color: 'var(--gov-slate-500)' }}>{t.slotTime}</span>
                  </td>
                  <td className="tabular-nums" style={{ fontWeight: 700, color: 'var(--gov-green-700)' }}>
                    {t.recommendedArrival}
                  </td>
                  <td>
                    <span className={`gov-badge ${t.status === 'AT_COUNTER' ? 'gov-badge-green' : t.status === 'IN_INSPECTION' ? 'gov-badge-ochre' : 'gov-badge-slate'}`} style={{ fontSize: '0.65rem' }}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="tabular-nums" style={{ fontWeight: 700 }}>
                    ₹{(t.calculatedPayout || (t.quantityQuintals * 2420)).toLocaleString('en-IN')}
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
