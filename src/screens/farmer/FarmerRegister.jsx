import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import {
  ShieldCheck,
  Upload,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  FileText
} from 'lucide-react';

export function FarmerRegister() {
  const { setFarmerScreen, addToast, playChime, setCurrentUser } = useAgrizen();

  const [formData, setFormData] = useState({
    name: "",
    tamilName: "",
    mobile: "",
    aadhaar: "",
    district: "Thanjavur",
    taluk: "Orathanadu",
    village: "",
    patta: "",
    surveyNo: "",
    acres: "3.5",
    crop: "Paddy (Ponni Samba)",
    bankName: "Canara Bank",
    accountNo: "",
    ifsc: ""
  });

  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    playChime();

    const newFarmer = {
      id: `FMR-TN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name || "K. Murugan",
      tamilName: formData.tamilName || "கே. முருகன்",
      mobile: `+91 ${formData.mobile || "98430 11200"}`,
      aadhaarMasked: `XXXX-XXXX-${formData.aadhaar.slice(-4) || "8812"}`,
      village: formData.village || "Orathanadu South",
      taluk: formData.taluk,
      district: formData.district,
      pincode: "614625",
      pattaNumber: formData.patta || "224/1A",
      surveyNumbers: [formData.surveyNo || "224/1A"],
      landAreaAcres: Number(formData.acres) || 3.5,
      primaryCrop: formData.crop,
      cropCategory: "Grade A Paddy",
      estimatedYieldQuintals: (Number(formData.acres) || 3.5) * 20,
      bankDetails: {
        bankName: formData.bankName,
        branch: `${formData.taluk} Branch`,
        accountNumberMasked: `••••••••${formData.accountNo.slice(-4) || "7712"}`,
        ifsc: formData.ifsc || "CNRB0001204",
        dbtLinked: true,
        npciStatus: "Active & Aadhaar Seeded"
      },
      kycStatus: "VERIFIED",
      registeredDate: new Date().toISOString().substring(0, 10),
      totalProcuredLifetime: 0,
      totalDisbursedLifetime: 0
    };

    setCurrentUser(newFarmer);
    addToast("Farmer e-KYC and land records registered successfully!", "success");
    setFarmerScreen('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('login')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Login</span>
        </button>
        <span className="gov-badge gov-badge-green">Govt e-KYC Verification</span>
      </div>

      <div className="gov-card">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
          Farmer Registration (விவசாயி பதிவு)
        </h3>
        <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
          Register your revenue land parcel and Aadhaar to enable automated Direct Benefit Transfer (DBT) and digital token queue booking.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal & Identity */}
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gov-green-800)', borderBottom: '1px solid var(--gov-border)', paddingBottom: '4px', marginBottom: '12px' }}>
            1. Farmer Identity & Contact
          </div>

          <div className="grid-2">
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="name-input">Full Name (as in Aadhaar)</label>
              <input
                id="name-input"
                type="text"
                className="gov-input"
                required
                placeholder="e.g. K. Murugan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="tamil-name-input">பெயர் தமிழில் (Tamil)</label>
              <input
                id="tamil-name-input"
                type="text"
                className="gov-input"
                placeholder="எ.கா. கே. முருகன்"
                value={formData.tamilName}
                onChange={(e) => setFormData({ ...formData, tamilName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="mob-input">Mobile Number</label>
              <input
                id="mob-input"
                type="tel"
                maxLength={10}
                className="gov-input"
                required
                placeholder="98430 XXXXX"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="aadhaar-input">12-Digit Aadhaar Number</label>
              <input
                id="aadhaar-input"
                type="text"
                maxLength={12}
                className="gov-input mono"
                required
                placeholder="XXXX-XXXX-XXXX"
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
              />
            </div>
          </div>

          {/* Section 2: Land & Revenue Details */}
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gov-green-800)', borderBottom: '1px solid var(--gov-border)', paddingBottom: '4px', margin: '14px 0 12px 0' }}>
            2. Landholding Records (பட்டா & நில விபரங்கள்)
          </div>

          <div className="grid-3">
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="district-select">District</label>
              <select
                id="district-select"
                className="gov-select"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              >
                <option value="Thanjavur">Thanjavur (தஞ்சாவூர்)</option>
                <option value="Tiruvarur">Tiruvarur (திருவாரூர்)</option>
                <option value="Nagapattinam">Nagapattinam (நாகப்பட்டினம்)</option>
                <option value="Tiruchirappalli">Tiruchirappalli (திருச்சி)</option>
                <option value="Pudukkottai">Pudukkottai (புதுக்கோட்டை)</option>
              </select>
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="taluk-input">Taluk</label>
              <input
                id="taluk-input"
                type="text"
                className="gov-input"
                value={formData.taluk}
                onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
              />
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="village-input">Village / கிராமம்</label>
              <input
                id="village-input"
                type="text"
                className="gov-input"
                required
                placeholder="e.g. Orathanadu East"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-3">
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="patta-input">Patta Passbook No.</label>
              <input
                id="patta-input"
                type="text"
                className="gov-input"
                required
                placeholder="e.g. 184/2A"
                value={formData.patta}
                onChange={(e) => setFormData({ ...formData, patta: e.target.value })}
              />
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="survey-input">Survey Number(s)</label>
              <input
                id="survey-input"
                type="text"
                className="gov-input"
                placeholder="e.g. 184/2A, 191/1"
                value={formData.surveyNo}
                onChange={(e) => setFormData({ ...formData, surveyNo: e.target.value })}
              />
            </div>

            <div className="gov-form-group">
              <label className="gov-label" htmlFor="acres-input">Cultivated Acres</label>
              <input
                id="acres-input"
                type="number"
                step="0.1"
                className="gov-input"
                value={formData.acres}
                onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
              />
            </div>
          </div>

          {/* Patta Doc Mock Upload */}
          <div className="gov-form-group">
            <label className="gov-label">Upload Patta / Chitta Extract (PDF/JPEG)</label>
            <label
              htmlFor="patta-file-upload"
              style={{
                border: '2px dashed var(--gov-border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: 'var(--gov-slate-50)',
                cursor: 'pointer',
                display: 'block'
              }}
            >
              <Upload size={20} color="var(--gov-slate-500)" style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--gov-slate-800)' }}>
                {fileName || "Tap to select Patta copy or Adangal certificate"}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--gov-slate-500)' }}>
                Auto-verified against Tamil Nadu e-Nilam database
              </span>
              <input
                id="patta-file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setFileName(e.target.files[0]?.name || "patta_extract_2026.pdf")}
              />
            </label>
          </div>

          <button
            type="submit"
            className="gov-btn gov-btn-primary gov-btn-lg"
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            <span>Submit Registration & Authorize DBT</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
