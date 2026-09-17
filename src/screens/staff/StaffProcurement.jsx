import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  Scale,
  Droplets,
  CheckCircle2,
  FileText,
  CreditCard,
  Building2,
  ArrowRight
} from 'lucide-react';

export function StaffProcurement() {
  const {
    tokens,
    activeCentre,
    advanceTokenStatus,
    setSelectedBookingDetails,
    setStaffScreen,
    addToast,
    playChime
  } = useAgrizen();

  // Find active tokens ready for procurement
  const activeTokens = tokens.filter(t => t.centreId === activeCentre.id && t.status !== 'COMPLETED');

  const [selectedTokenId, setSelectedTokenId] = useState(activeTokens[0]?.id || "TKN-0042");
  const [cropGrade, setCropGrade] = useState("Grade A Paddy (Ponni / Samba) - ₹2,420/Qtl");
  const [grossWeight, setGrossWeight] = useState("7350");
  const [tareWeight, setTareWeight] = useState("2850");
  const [moisture, setMoisture] = useState("14.4");
  const [foreignMatter, setForeignMatter] = useState("0.8");
  const [gunnyBagsCount, setGunnyBagsCount] = useState("112");

  const netKg = Math.max(0, Number(grossWeight) - Number(tareWeight));
  const netQtl = netKg / 100;
  const ratePerQtl = 2420;
  const totalPayout = netQtl * ratePerQtl;

  const currentSelectedToken = tokens.find(t => t.id === selectedTokenId) || activeTokens[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    playChime();

    advanceTokenStatus(selectedTokenId, 'COMPLETED', {
      moisturePercent: Number(moisture),
      grossWeightKg: Number(grossWeight),
      tareWeightKg: Number(tareWeight),
      netWeightQuintals: netQtl,
      calculatedPayout: totalPayout
    });

    if (currentSelectedToken) {
      setSelectedBookingDetails({
        ...currentSelectedToken,
        moisturePercent: Number(moisture),
        grossWeightKg: Number(grossWeight),
        tareWeightKg: Number(tareWeight),
        netWeightQuintals: netQtl,
        calculatedPayout: totalPayout,
        weighmentSlipNo: `TNCSC/THJ/WS/2026-${Math.floor(1000 + Math.random() * 9000)}`
      });
    }

    addToast(`Weighment finalized for ${currentSelectedToken?.farmerName}. DBT Dispatched!`, "success");
    setStaffScreen('procurement-details');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--gov-slate-900)' }}>
          Procurement Weighment Entry
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
          Official NABL Weighbridge Recording &amp; Automated Direct Benefit Transfer (DBT) Voucher Generation
        </p>
      </div>

      <div className="gov-card">
        <form onSubmit={handleSubmit}>
          {/* Token Selection */}
          <div className="gov-form-group">
            <label className="gov-label" htmlFor="lot-select">Select Staged Token / Farmer</label>
            <select
              id="lot-select"
              className="gov-select mono"
              value={selectedTokenId}
              onChange={(e) => setSelectedTokenId(e.target.value)}
            >
              {activeTokens.map(t => (
                <option key={t.id} value={t.id}>
                  {t.tokenNumber} - {t.farmerName} ({t.crop}) - Status: {t.status}
                </option>
              ))}
            </select>
          </div>

          <div className="grid-2">
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="grade-select">Grain Classification &amp; MSP Rate</label>
              <select
                id="grade-select"
                className="gov-select"
                value={cropGrade}
                onChange={(e) => setCropGrade(e.target.value)}
              >
                <option value="Grade A Paddy (Ponni / Samba) - ₹2,420/Qtl">Grade A Paddy (Ponni / Samba) - ₹2,420/Qtl</option>
                <option value="Common Paddy (BPT 5204 / ADT) - ₹2,278/Qtl">Common Paddy (BPT 5204 / ADT) - ₹2,278/Qtl</option>
              </select>
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="gunny-bags">Total Gunny Bags Packaged</label>
              <input
                id="gunny-bags"
                type="number"
                className="gov-input"
                value={gunnyBagsCount}
                onChange={(e) => setGunnyBagsCount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid-3">
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="gross-kg">Gross Weight (kg)</label>
              <input
                id="gross-kg"
                type="number"
                className="gov-input mono tabular-nums"
                required
                value={grossWeight}
                onChange={(e) => setGrossWeight(e.target.value)}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>Weighbridge In (Tractor loaded)</span>
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="tare-kg">Tare Weight (kg)</label>
              <input
                id="tare-kg"
                type="number"
                className="gov-input mono tabular-nums"
                required
                value={tareWeight}
                onChange={(e) => setTareWeight(e.target.value)}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>Weighbridge Out (Empty trailer)</span>
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="moisture-field">Moisture Reading (%)</label>
              <input
                id="moisture-field"
                type="number"
                step="0.1"
                className="gov-input"
                required
                value={moisture}
                onChange={(e) => setMoisture(e.target.value)}
              />
              <span style={{ fontSize: '0.72rem', color: Number(moisture) <= 17 ? 'var(--gov-green-700)' : 'var(--gov-earth-700)' }}>
                Limit &le; 17.0%
              </span>
            </div>
          </div>

          {/* Dynamic Net Result Box */}
          <div style={{
            backgroundColor: 'var(--gov-slate-900)',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            margin: '1.25rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Net Procurement Weight
              </div>
              <div className="mono tabular-nums" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
                {netQtl.toFixed(2)} Quintals
              </div>
              <div style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>
                ({netKg.toLocaleString('en-IN')} kg net paddy delivered)
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#fef08a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Instant DBT Settlement Payout
              </div>
              <div className="tabular-nums" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#4ade80' }}>
                ₹{totalPayout.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>
                Direct transfer to Aadhaar seeded bank A/C
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="gov-btn gov-btn-primary gov-btn-lg"
            style={{ width: '100%' }}
          >
            <CheckCircle2 size={18} />
            <span>Generate Official Weighment Certificate &amp; Authorize DBT</span>
          </button>
        </form>
      </div>
    </div>
  );
}
