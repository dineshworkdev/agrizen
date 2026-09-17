import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { MOCK_MSP_RATES } from '../../data/mockData';
import {
  Calendar,
  Clock,
  Building2,
  Wheat,
  Truck,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export function FarmerSlotBooking() {
  const {
    currentUser,
    centres,
    activeCentre,
    bookNewSlot,
    setFarmerScreen,
    setSelectedBookingDetails
  } = useAgrizen();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedCrop, setSelectedCrop] = useState("Paddy (Grade A - Ponni / Samba)");
  const [quantity, setQuantity] = useState("45.0");
  const [selectedCentreId, setSelectedCentreId] = useState(activeCentre.id);
  const [slotDate, setSlotDate] = useState("2026-09-18");
  const [slotTime, setSlotTime] = useState("10:00 AM - 11:00 AM");
  const [vehicleType, setVehicleType] = useState("Tractor + Trailer");
  const [vehicleNumber, setVehicleNumber] = useState("TN-49-AB-2041");
  const [moisture, setMoisture] = useState("14.4");

  // Lookup MSP
  const mspObj = MOCK_MSP_RATES.find(r => r.cropName.includes(selectedCrop.split(' ')[0])) || MOCK_MSP_RATES[0];
  const ratePerQtl = mspObj.netPayoutPerQuintal || 2420;
  const estimatedPayout = (Number(quantity) || 0) * ratePerQtl;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete booking
      const token = bookNewSlot({
        crop: selectedCrop,
        quantity,
        centreId: selectedCentreId,
        slotDate,
        slotTime,
        vehicleType,
        vehicleNumber,
        moisture
      });
      setSelectedBookingDetails(token);
      setFarmerScreen('booking-confirmation');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      setFarmerScreen('dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={handleBack}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>{currentStep === 1 ? 'Cancel' : 'Previous Step'}</span>
        </button>
        <span className="gov-badge gov-badge-green">Step {currentStep} of 4</span>
      </div>

      {/* Wizard Progress Indicator */}
      <div className="wizard-step-indicator">
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          right: '20px',
          height: '2px',
          backgroundColor: 'var(--gov-slate-200)',
          zIndex: 1
        }} />

        <div className={`wizard-step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="wizard-step-circle">1</div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Crop & Qtl</span>
        </div>

        <div className={`wizard-step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="wizard-step-circle">2</div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Centre</span>
        </div>

        <div className={`wizard-step-item ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
          <div className="wizard-step-circle">3</div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Date & Slot</span>
        </div>

        <div className={`wizard-step-item ${currentStep >= 4 ? 'active' : ''}`}>
          <div className="wizard-step-circle">4</div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Transport</span>
        </div>
      </div>

      {/* Step 1: Crop Selection & Quantity */}
      {currentStep === 1 && (
        <div className="gov-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>1. Select Crop Variety & Quantity</h3>
          <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            Choose registered paddy or millet crop harvested from your Patta land ({currentUser.pattaNumber}).
          </p>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="crop-select">Paddy / Crop Variety</label>
            <select
              id="crop-select"
              className="gov-select"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              <option value="Paddy (Grade A - Ponni / Samba)">Paddy (Grade A - Ponni / Samba) - ₹2,420/Qtl</option>
              <option value="Paddy (Common - BPT 5204 / ADT)">Paddy (Common - BPT 5204 / ADT) - ₹2,278/Qtl</option>
              <option value="Ragi / Finger Millet">Ragi / Finger Millet - ₹4,290/Qtl</option>
              <option value="Groundnut (In-Shell)">Groundnut (In-Shell) - ₹6,780/Qtl</option>
            </select>
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="qty-input">Estimated Quantity (in Quintals)</label>
            <input
              id="qty-input"
              type="number"
              step="0.5"
              min="5"
              max="200"
              className="gov-input"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 45.0"
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
              Standard 1 Gunny Bag = ~40 kg. 25 bags = 10 Quintals.
            </span>
          </div>

          {/* MSP Payout Calculation Preview */}
          <div style={{
            backgroundColor: 'var(--gov-green-50)',
            border: '1.5px solid rgba(21, 128, 61, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gov-green-800)', textTransform: 'uppercase' }}>
                  Assured Government Payout
                </span>
                <div style={{ fontSize: '0.82rem', color: 'var(--gov-slate-600)' }}>
                  Rate: ₹{ratePerQtl} / Quintal (incl. ₹100 TN State Incentive)
                </div>
              </div>
              <div className="tabular-nums" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-green-900)' }}>
                ₹{estimatedPayout.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Choose DPC Centre */}
      {currentStep === 2 && (
        <div className="gov-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>2. Select Direct Procurement Centre</h3>
          <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            Choose a nearby DPC based on real-time waiting times and drying yard availability.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {centres.map(c => {
              const isSelected = selectedCentreId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCentreId(c.id)}
                  style={{
                    border: isSelected ? '2px solid var(--gov-green-700)' : '1px solid var(--gov-border)',
                    backgroundColor: isSelected ? 'var(--gov-green-50)' : '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '0.96rem', color: 'var(--gov-slate-900)' }}>
                      {c.name}
                    </h4>
                    <span className={`gov-badge ${c.status === 'HIGH_RUSH' ? 'gov-badge-ochre' : 'gov-badge-green'}`} style={{ fontSize: '0.68rem' }}>
                      {c.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)', marginTop: '3px' }}>
                    {c.address} • {c.distanceKm} km from your village
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '0.65rem',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid var(--gov-border)',
                    fontSize: '0.78rem',
                    color: 'var(--gov-slate-700)'
                  }}>
                    <span>⏱️ Avg Wait: <strong>{c.averageWaitMinutes} mins</strong></span>
                    <span>⚖️ <strong>{c.activeCountersCount} Counters</strong></span>
                    <span>📦 <strong>{c.dailyCapacityTokens - c.currentWaitingTokens} Slots Left</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Date & Time Window */}
      {currentStep === 3 && (
        <div className="gov-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>3. Select Date & Slot Window</h3>
          <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            Booking in advance reserves your weighbridge turn and guarantees priority yard staging.
          </p>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="date-input">Procurement Date</label>
            <input
              id="date-input"
              type="date"
              className="gov-input"
              value={slotDate}
              min="2026-09-17"
              max="2026-09-24"
              onChange={(e) => setSlotDate(e.target.value)}
            />
          </div>

          <div className="gov-form-group">
            <label className="gov-label">Available Time Windows</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { time: "08:30 AM - 09:30 AM", rush: "Low Rush", wait: "~10 mins" },
                { time: "09:30 AM - 10:30 AM", rush: "Moderate", wait: "~16 mins" },
                { time: "10:30 AM - 11:30 AM", rush: "Moderate", wait: "~18 mins" },
                { time: "11:30 AM - 12:30 PM", rush: "High Rush", wait: "~26 mins" },
                { time: "01:30 PM - 02:30 PM", rush: "Low Rush", wait: "~12 mins" },
                { time: "02:30 PM - 03:30 PM", rush: "Moderate", wait: "~15 mins" }
              ].map(slot => {
                const isSelected = slotTime === slot.time;
                return (
                  <div
                    key={slot.time}
                    onClick={() => setSlotTime(slot.time)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--gov-green-700)' : '1px solid var(--gov-border)',
                      backgroundColor: isSelected ? 'var(--gov-green-50)' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color={isSelected ? "var(--gov-green-700)" : "var(--gov-slate-400)"} />
                      <span className="tabular-nums" style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gov-slate-900)' }}>
                        {slot.time}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`gov-badge ${slot.rush === 'Low Rush' ? 'gov-badge-green' : slot.rush === 'Moderate' ? 'gov-badge-slate' : 'gov-badge-ochre'}`} style={{ fontSize: '0.68rem' }}>
                        {slot.rush}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)' }}>
                        {slot.wait}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Transport & Pre-declaration */}
      {currentStep === 4 && (
        <div className="gov-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>4. Vehicle Details & Pre-check</h3>
          <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            Register your vehicle plate for automated weighbridge recognition at the DPC gate.
          </p>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="vehicle-type-select">Transport Vehicle Type</label>
            <select
              id="vehicle-type-select"
              className="gov-select"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="Tractor + Trailer">Tractor + Trailer</option>
              <option value="Mini Truck (Tata Ace)">Mini Truck (Tata Ace / Bolero)</option>
              <option value="Lorry (6-Wheeler)">Lorry (6-Wheeler Consignment)</option>
              <option value="Bullock Cart">Bullock Cart</option>
            </select>
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="vehicle-num-input">Vehicle Registration Number</label>
            <input
              id="vehicle-num-input"
              type="text"
              className="gov-input mono"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="e.g. TN-49-AB-2041"
            />
          </div>

          <div className="gov-form-group">
            <label className="gov-label" htmlFor="moisture-input">Estimated Moisture Level (Optional Pre-check)</label>
            <input
              id="moisture-input"
              type="number"
              step="0.1"
              min="10"
              max="22"
              className="gov-input"
              value={moisture}
              onChange={(e) => setMoisture(e.target.value)}
              placeholder="14.4%"
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gov-slate-500)', marginTop: '2px' }}>
              Lots &le; 17.0% moisture are accepted directly. Free sun-drying yard provided if above 17.0%.
            </span>
          </div>

          {/* Verification Review Card */}
          <div style={{
            backgroundColor: 'var(--gov-slate-50)',
            border: '1px solid var(--gov-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            marginTop: '1rem',
            fontSize: '0.82rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gov-green-800)', fontWeight: 700, marginBottom: '4px' }}>
              <ShieldCheck size={16} />
              <span>Aadhaar-Linked DBT Direct Deposit</span>
            </div>
            <p style={{ color: 'var(--gov-slate-600)' }}>
              Net MSP payout will be credited directly to <strong>{currentUser.bankDetails.bankName} ({currentUser.bankDetails.accountNumberMasked})</strong> within 24-48 hours of weighment.
            </p>
          </div>
        </div>
      )}

      {/* Wizard Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn gov-btn-secondary"
          onClick={handleBack}
        >
          {currentStep === 1 ? 'Cancel' : 'Back'}
        </button>

        <button
          className="gov-btn gov-btn-primary"
          onClick={handleNext}
        >
          <span>{currentStep === 4 ? 'Confirm & Generate Token' : 'Proceed to Step ' + (currentStep + 1)}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
