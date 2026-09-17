// Agrizen Central Mock Data Store
// Realistic Tamil Nadu / Indian Agricultural Procurement Ecosystem

export const MOCK_FARMERS = [
  {
    id: "FMR-TN-2024-8841",
    name: "Muthuvel Pandian",
    tamilName: "முத்துவேல் பாண்டியன்",
    mobile: "+91 98421 77312",
    aadhaarMasked: "XXXX-XXXX-4402",
    village: "Orathanadu East",
    taluk: "Orathanadu",
    district: "Thanjavur",
    pincode: "614625",
    pattaNumber: "184/2A",
    surveyNumbers: ["184/2A", "184/2B", "191/1"],
    landAreaAcres: 4.5,
    primaryCrop: "Paddy (Ponni Samba)",
    cropCategory: "Grade A Paddy",
    estimatedYieldQuintals: 90.0,
    bankDetails: {
      bankName: "Canara Bank",
      branch: "Orathanadu Rural Branch",
      accountNumberMasked: "••••••••4402",
      ifsc: "CNRB0001204",
      dbtLinked: true,
      npciStatus: "Active & Aadhaar Seeded"
    },
    kycStatus: "VERIFIED",
    registeredDate: "2024-06-14",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    totalProcuredLifetime: 284.5, // Quintals
    totalDisbursedLifetime: 648260 // INR
  },
  {
    id: "FMR-TN-2024-7129",
    name: "Kannan Ramasamy",
    tamilName: "கண்ணன் ராமசாமி",
    mobile: "+91 94431 82910",
    aadhaarMasked: "XXXX-XXXX-9128",
    village: "Thiruvaiyaru South",
    taluk: "Thiruvaiyaru",
    district: "Thanjavur",
    pincode: "613204",
    pattaNumber: "302/4",
    surveyNumbers: ["302/4", "305/1"],
    landAreaAcres: 3.2,
    primaryCrop: "Paddy (BPT 5204)",
    cropCategory: "Common Paddy",
    estimatedYieldQuintals: 64.0,
    bankDetails: {
      bankName: "State Bank of India",
      branch: "Thiruvaiyaru Branch",
      accountNumberMasked: "••••••••9128",
      ifsc: "SBIN0000938",
      dbtLinked: true,
      npciStatus: "Active & Aadhaar Seeded"
    },
    kycStatus: "VERIFIED",
    registeredDate: "2024-07-02",
    totalProcuredLifetime: 192.0,
    totalDisbursedLifetime: 422976
  },
  {
    id: "FMR-TN-2024-3401",
    name: "Meenakshi Sundaram",
    tamilName: "மீனாட்சி சுந்தரம்",
    mobile: "+91 97890 11452",
    aadhaarMasked: "XXXX-XXXX-3341",
    village: "Needamangalam West",
    taluk: "Needamangalam",
    district: "Tiruvarur",
    pincode: "614404",
    pattaNumber: "419/1B",
    surveyNumbers: ["419/1B", "420/2"],
    landAreaAcres: 6.0,
    primaryCrop: "Paddy (CR 1009)",
    cropCategory: "Grade A Paddy",
    estimatedYieldQuintals: 120.0,
    bankDetails: {
      bankName: "Indian Overseas Bank",
      branch: "Needamangalam Branch",
      accountNumberMasked: "••••••••3341",
      ifsc: "IOBA0000412",
      dbtLinked: true,
      npciStatus: "Active & Aadhaar Seeded"
    },
    kycStatus: "VERIFIED",
    registeredDate: "2024-05-18",
    totalProcuredLifetime: 360.0,
    totalDisbursedLifetime: 835200
  },
  {
    id: "FMR-TN-2024-9042",
    name: "Selvaraj Natarajan",
    tamilName: "செல்வராஜ் நடராஜன்",
    mobile: "+91 98432 60781",
    aadhaarMasked: "XXXX-XXXX-6719",
    village: "Alangudi North",
    taluk: "Alangudi",
    district: "Pudukkottai",
    pincode: "622301",
    pattaNumber: "112/3",
    surveyNumbers: ["112/3"],
    landAreaAcres: 2.8,
    primaryCrop: "Ragi / Finger Millet",
    cropCategory: "Millets",
    estimatedYieldQuintals: 35.0,
    bankDetails: {
      bankName: "Tamilnad Mercantile Bank",
      branch: "Alangudi Branch",
      accountNumberMasked: "••••••••6719",
      ifsc: "TMBL0000109",
      dbtLinked: true,
      npciStatus: "Active & Aadhaar Seeded"
    },
    kycStatus: "VERIFIED",
    registeredDate: "2024-08-01",
    totalProcuredLifetime: 85.0,
    totalDisbursedLifetime: 364650
  },
  {
    id: "FMR-TN-2024-6512",
    name: "Priya Venkatesh",
    tamilName: "பிரியா வெங்கடேஷ்",
    mobile: "+91 99420 54109",
    aadhaarMasked: "XXXX-XXXX-1904",
    village: "Lalgudi Melur",
    taluk: "Lalgudi",
    district: "Tiruchirappalli",
    pincode: "621601",
    pattaNumber: "245/1A",
    surveyNumbers: ["245/1A", "248/3"],
    landAreaAcres: 5.0,
    primaryCrop: "Paddy (ADT 45)",
    cropCategory: "Grade A Paddy",
    estimatedYieldQuintals: 105.0,
    bankDetails: {
      bankName: "Canara Bank",
      branch: "Lalgudi Main Branch",
      accountNumberMasked: "••••••••1904",
      ifsc: "CNRB0000841",
      dbtLinked: true,
      npciStatus: "Active & Aadhaar Seeded"
    },
    kycStatus: "VERIFIED",
    registeredDate: "2024-06-28",
    totalProcuredLifetime: 210.0,
    totalDisbursedLifetime: 487200
  }
];

export const MOCK_CENTRES = [
  {
    id: "DPC-THJ-01",
    code: "TN-CSC-THJ-01",
    name: "Thanjavur South Central DPC",
    tamilName: "தஞ்சாவூர் தெற்கு நேரடி நெல் கொள்முதல் நிலையம்",
    address: "Old Bus Stand Road, Near Railway Goods Yard",
    taluk: "Thanjavur",
    district: "Thanjavur",
    pincode: "613001",
    distanceKm: 4.8,
    status: "OPERATIONAL", // OPERATIONAL, HIGH_RUSH, PAUSED, CLOSED
    operatingHours: "08:30 AM - 05:30 PM",
    activeCountersCount: 4,
    dailyCapacityQuintals: 600,
    dailyCapacityTokens: 120,
    currentDayIntakeQuintals: 382.5,
    currentWaitingTokens: 14,
    averageWaitMinutes: 18,
    supervisor: {
      name: "K. Sundaram, AO",
      tamilName: "கே. சுந்தரம் (வேளாண் அலுவலர்)",
      staffId: "TN-CSC-EMP-8812",
      mobile: "+91 94432 10842",
      email: "dpc.thanjavur01@tncsc.tn.gov.in"
    },
    facilities: [
      "10,000 sq.ft High-Roof Covered Drying Shed",
      "50-Tonne Electronic Pitless Weighbridge (NABL Certified)",
      "2x Digital Grain Moisture Analyzers (AgroCal-PRO)",
      "Dedicated Farmer Rest Pavilion with RO Purified Water",
      "High-speed 4G/Fibre Optical Connectivity with Solar Backup"
    ],
    supportedCrops: ["Paddy (Ponni Samba)", "Paddy (BPT 5204)", "Paddy (CR 1009)"],
    weatherNotice: {
      condition: "Clear Sky, 32°C",
      humidity: "58%",
      windSpeed: "11 km/h",
      dryingIndex: "EXCELLENT",
      alert: "Ideal drying conditions. Moisture reductions averaging 0.4% per hour on yard."
    }
  },
  {
    id: "DPC-THJ-02",
    code: "TN-CSC-THJ-02",
    name: "Orathanadu Model DPC",
    tamilName: "ஒரத்தநாடு மாதிரி நெல் கொள்முதல் நிலையம்",
    address: "Pattukkottai Main Road, Opp. Taluk Office",
    taluk: "Orathanadu",
    district: "Thanjavur",
    pincode: "614625",
    distanceKm: 1.2,
    status: "HIGH_RUSH",
    operatingHours: "08:00 AM - 06:00 PM",
    activeCountersCount: 3,
    dailyCapacityQuintals: 500,
    dailyCapacityTokens: 100,
    currentDayIntakeQuintals: 440.0,
    currentWaitingTokens: 26,
    averageWaitMinutes: 38,
    supervisor: {
      name: "V. Panneerselvam, Dy. AO",
      tamilName: "வி. பன்னீர்செல்வம்",
      staffId: "TN-CSC-EMP-6604",
      mobile: "+91 94434 22091",
      email: "dpc.orathanadu@tncsc.tn.gov.in"
    },
    facilities: [
      "Covered Offloading Bay",
      "30-Tonne Weighbridge",
      "Moisture Testing Kiosk",
      "Direct DBT Acknowledgement Printer"
    ],
    supportedCrops: ["Paddy (Ponni Samba)", "Paddy (CR 1009)", "Ragi"],
    weatherNotice: {
      condition: "Partly Cloudy, 30°C",
      humidity: "68%",
      windSpeed: "8 km/h",
      dryingIndex: "MODERATE",
      alert: "Mild moisture delay (+15m) due to morning dampness in open trailers."
    }
  },
  {
    id: "DPC-KMK-03",
    code: "TN-CSC-KMK-03",
    name: "Kumbakonam Cauvery Basin DPC",
    tamilName: "கும்பகோணம் காவேரி நேரடி கொள்முதல் மையம்",
    address: "Kollidam Bund Road, Annalagraharam",
    taluk: "Kumbakonam",
    district: "Thanjavur",
    pincode: "612401",
    distanceKm: 28.5,
    status: "OPERATIONAL",
    operatingHours: "08:30 AM - 05:30 PM",
    activeCountersCount: 5,
    dailyCapacityQuintals: 700,
    dailyCapacityTokens: 140,
    currentDayIntakeQuintals: 310.0,
    currentWaitingTokens: 9,
    averageWaitMinutes: 12,
    supervisor: {
      name: "S. Rajendran, AO",
      staffId: "TN-CSC-EMP-9140",
      mobile: "+91 94430 45819"
    },
    facilities: ["Dual Weighbridges", "Lab Grade Moisture Analyzers", "Rest Canteen"],
    supportedCrops: ["Paddy (Ponni Samba)", "Paddy (ADT 45)", "Paddy (CR 1009)"]
  },
  {
    id: "DPC-TRV-04",
    code: "TN-CSC-TRV-04",
    name: "Tiruvarur Delta Agro Hub",
    tamilName: "திருவாரூர் டெல்டா வேளாண் கொள்முதல் மையம்",
    address: "Kudavasal Road, Bye-pass Junction",
    taluk: "Needamangalam",
    district: "Tiruvarur",
    pincode: "613701",
    distanceKm: 34.0,
    status: "OPERATIONAL",
    operatingHours: "08:30 AM - 05:30 PM",
    activeCountersCount: 4,
    dailyCapacityQuintals: 600,
    dailyCapacityTokens: 120,
    currentDayIntakeQuintals: 395.0,
    currentWaitingTokens: 16,
    averageWaitMinutes: 22,
    supervisor: {
      name: "G. Murugesan, AO",
      staffId: "TN-CSC-EMP-4491",
      mobile: "+91 94435 90123"
    },
    facilities: ["High-speed bagger", "Electronic weighbridge", "Sample archive"],
    supportedCrops: ["Paddy (CR 1009)", "Paddy (BPT 5204)"]
  },
  {
    id: "DPC-PDK-05",
    code: "TN-CSC-PDK-05",
    name: "Alangudi Pudukkottai DPC",
    tamilName: "ஆலங்குடி புதுக்கோட்டை நேரடி மையம்",
    address: "Peravurani Main Road, Alangudi",
    taluk: "Alangudi",
    district: "Pudukkottai",
    pincode: "622301",
    distanceKm: 26.0,
    status: "OPERATIONAL",
    operatingHours: "09:00 AM - 05:00 PM",
    activeCountersCount: 2,
    dailyCapacityQuintals: 400,
    dailyCapacityTokens: 80,
    currentDayIntakeQuintals: 180.0,
    currentWaitingTokens: 7,
    averageWaitMinutes: 14,
    supervisor: {
      name: "M. Ravichandran, Dy. AO",
      staffId: "TN-CSC-EMP-3312",
      mobile: "+91 94439 77810"
    },
    facilities: ["Millet grading sieve", "Weighbridge", "Covered shed"],
    supportedCrops: ["Ragi / Finger Millet", "Groundnut (Pod)", "Paddy (BPT 5204)"]
  },
  {
    id: "DPC-TRC-06",
    code: "TN-CSC-TRC-06",
    name: "Lalgudi Direct Grain Terminal",
    tamilName: "லால்குடி நேரடி தானிய முனையம்",
    address: "Samayapuram Road, Lalgudi",
    taluk: "Lalgudi",
    district: "Tiruchirappalli",
    pincode: "621601",
    distanceKm: 42.0,
    status: "OPERATIONAL",
    operatingHours: "08:30 AM - 05:30 PM",
    activeCountersCount: 3,
    dailyCapacityQuintals: 550,
    dailyCapacityTokens: 110,
    currentDayIntakeQuintals: 275.0,
    currentWaitingTokens: 11,
    averageWaitMinutes: 19,
    supervisor: {
      name: "T. Senthil Kumar, AO",
      staffId: "TN-CSC-EMP-7199",
      mobile: "+91 94438 44102"
    },
    facilities: ["Electronic weighing", "Moisture testing", "Farmer canteen"],
    supportedCrops: ["Paddy (ADT 45)", "Paddy (Ponni Samba)"]
  }
];

export const MOCK_COUNTERS = [
  {
    id: "CTR-01",
    centreId: "DPC-THJ-01",
    number: 1,
    name: "Gate Token & Land Verification",
    operatorName: "R. Manikandan, JA",
    status: "ACTIVE", // ACTIVE, PAUSED, CLOSED
    currentServingToken: "TN-THJ-26-0038",
    tokensProcessedToday: 28,
    avgProcessingSeconds: 320,
    stage: "VERIFICATION"
  },
  {
    id: "CTR-02",
    centreId: "DPC-THJ-01",
    number: 2,
    name: "Gross Weighbridge 1 (Tractors)",
    operatorName: "P. Vignesh, Weighman",
    status: "ACTIVE",
    currentServingToken: "TN-THJ-26-0039",
    tokensProcessedToday: 26,
    avgProcessingSeconds: 410,
    stage: "WEIGHBRIDGE_GROSS"
  },
  {
    id: "CTR-03",
    centreId: "DPC-THJ-01",
    number: 3,
    name: "Moisture & Quality Inspection Lab",
    operatorName: "S. Anitha, QA Analyst",
    status: "ACTIVE",
    currentServingToken: "TN-THJ-26-0040",
    tokensProcessedToday: 25,
    avgProcessingSeconds: 380,
    stage: "MOISTURE_TESTING"
  },
  {
    id: "CTR-04",
    centreId: "DPC-THJ-01",
    number: 4,
    name: "Tare Weighment & DBT Dispatch",
    operatorName: "D. Jayakumar, Cashier",
    status: "ACTIVE",
    currentServingToken: "TN-THJ-26-0037",
    tokensProcessedToday: 24,
    avgProcessingSeconds: 290,
    stage: "DBT_DISPATCH"
  }
];

export const MOCK_MSP_RATES = [
  {
    cropCode: "PAD-GRA",
    cropName: "Paddy (Grade A - Ponni / Samba)",
    tamilName: "நெல் (தரம் 'ஏ' - பொன்னி / சம்பா)",
    season: "Kharif / Samba 2026-27",
    mspPerQuintal: 2320,
    stateBonusPerQuintal: 100, // TN Govt incentive
    netPayoutPerQuintal: 2420,
    maxMoistureAllowed: 17.0,
    idealMoistureRange: "13.5% - 15.0%",
    foreignMatterMax: 1.0,
    discoloredMax: 3.0
  },
  {
    cropCode: "PAD-COM",
    cropName: "Paddy (Common - BPT 5204 / ADT)",
    tamilName: "நெல் (பொது ரகம் - BPT / ADT)",
    season: "Kharif / Samba 2026-27",
    mspPerQuintal: 2203,
    stateBonusPerQuintal: 75,
    netPayoutPerQuintal: 2278,
    maxMoistureAllowed: 17.0,
    idealMoistureRange: "14.0% - 15.5%",
    foreignMatterMax: 1.5,
    discoloredMax: 4.0
  },
  {
    cropCode: "MIL-RAGI",
    cropName: "Ragi / Finger Millet",
    tamilName: "கேழ்வரகு (ராகி)",
    season: "2026-27",
    mspPerQuintal: 4290,
    stateBonusPerQuintal: 0,
    netPayoutPerQuintal: 4290,
    maxMoistureAllowed: 12.0,
    idealMoistureRange: "10.0% - 11.5%"
  },
  {
    cropCode: "OIL-GND",
    cropName: "Groundnut (In-Shell)",
    tamilName: "நிலக்கடலை (காய்)",
    season: "2026-27",
    mspPerQuintal: 6780,
    stateBonusPerQuintal: 0,
    netPayoutPerQuintal: 6780,
    maxMoistureAllowed: 9.0,
    idealMoistureRange: "7.0% - 8.5%"
  }
];

export const INITIAL_TOKENS = [
  {
    id: "TKN-0037",
    tokenNumber: "TN-THJ-26-0037",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-5520",
    farmerName: "Arumugam Chettiar",
    village: "Papanasam",
    crop: "Paddy (Ponni Samba)",
    cropCategory: "Grade A Paddy",
    quantityQuintals: 38.0,
    vehicleType: "Tractor",
    vehicleNumber: "TN-49-C-4921",
    slotDate: "2026-09-17",
    slotTime: "10:00 AM - 11:00 AM",
    recommendedArrival: "09:45 AM",
    status: "AT_COUNTER", // SCHEDULED, IN_QUEUE, AT_COUNTER, IN_INSPECTION, WEIGHED, COMPLETED, DELAYED
    assignedCounter: "Counter 4 (Tare & DBT)",
    queuePosition: 0,
    moisturePercent: 14.2,
    tareWeightKg: 2840,
    grossWeightKg: 6640,
    netWeightQuintals: 38.0,
    calculatedPayout: 91960,
    securityHash: "AGZ-8812-3901-THJ",
    calledAt: "10:35 AM"
  },
  {
    id: "TKN-0038",
    tokenNumber: "TN-THJ-26-0038",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-1184",
    farmerName: "Dharmalingam Velu",
    village: "Kumbakonam Rural",
    crop: "Paddy (Ponni Samba)",
    cropCategory: "Grade A Paddy",
    quantityQuintals: 35.0,
    vehicleType: "Mini Truck (Tata Ace)",
    vehicleNumber: "TN-49-X-1120",
    slotDate: "2026-09-17",
    slotTime: "10:00 AM - 11:00 AM",
    recommendedArrival: "09:50 AM",
    status: "AT_COUNTER",
    assignedCounter: "Counter 1 (Verification)",
    queuePosition: 0,
    moisturePercent: 14.6,
    securityHash: "AGZ-9912-4011-THJ",
    calledAt: "10:40 AM"
  },
  {
    id: "TKN-0039",
    tokenNumber: "TN-THJ-26-0039",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-7129",
    farmerName: "Kannan Ramasamy",
    village: "Thiruvaiyaru South",
    crop: "Paddy (BPT 5204)",
    cropCategory: "Common Paddy",
    quantityQuintals: 40.0,
    vehicleType: "Tractor + Trailer",
    vehicleNumber: "TN-49-Z-8831",
    slotDate: "2026-09-17",
    slotTime: "10:30 AM - 11:30 AM",
    recommendedArrival: "10:15 AM",
    status: "AT_COUNTER",
    assignedCounter: "Counter 2 (Weighbridge)",
    queuePosition: 0,
    moisturePercent: 14.8,
    grossWeightKg: 7200,
    securityHash: "AGZ-7129-3320-THJ",
    calledAt: "10:42 AM"
  },
  {
    id: "TKN-0040",
    tokenNumber: "TN-THJ-26-0040",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-3401",
    farmerName: "Meenakshi Sundaram",
    village: "Needamangalam West",
    crop: "Paddy (CR 1009)",
    cropCategory: "Grade A Paddy",
    quantityQuintals: 50.0,
    vehicleType: "Tractor + Trailer",
    vehicleNumber: "TN-50-E-9041",
    slotDate: "2026-09-17",
    slotTime: "10:30 AM - 11:30 AM",
    recommendedArrival: "10:20 AM",
    status: "IN_INSPECTION",
    assignedCounter: "Counter 3 (Moisture Lab)",
    queuePosition: 0,
    moisturePercent: 15.1,
    securityHash: "AGZ-3401-9981-TRV",
    calledAt: "10:45 AM"
  },
  {
    id: "TKN-0041",
    tokenNumber: "TN-THJ-26-0041",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-9042",
    farmerName: "Selvaraj Natarajan",
    village: "Alangudi North",
    crop: "Paddy (Ponni Samba)",
    cropCategory: "Grade A Paddy",
    quantityQuintals: 30.0,
    vehicleType: "Mini Truck",
    vehicleNumber: "TN-55-Q-2018",
    slotDate: "2026-09-17",
    slotTime: "11:00 AM - 12:00 PM",
    recommendedArrival: "10:40 AM",
    status: "IN_QUEUE",
    queuePosition: 1,
    estimatedTurnTime: "10:55 AM",
    securityHash: "AGZ-9042-8812-PDK"
  },
  {
    id: "TKN-0042",
    tokenNumber: "TN-THJ-26-0042",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-8841",
    farmerName: "Muthuvel Pandian",
    farmerTamilName: "முத்துவேல் பாண்டியன்",
    village: "Orathanadu East",
    crop: "Paddy (Ponni Samba)",
    cropCategory: "Grade A Paddy",
    quantityQuintals: 45.0,
    vehicleType: "Tractor + Trailer",
    vehicleNumber: "TN-49-AB-2041",
    slotDate: "2026-09-17",
    slotTime: "11:00 AM - 12:00 PM",
    recommendedArrival: "10:45 AM",
    status: "IN_QUEUE",
    queuePosition: 2, // 1 ahead of him (TKN-0041)
    estimatedTurnTime: "11:05 AM",
    assignedCounter: "Counter 3 - Moisture & Weighing",
    moisturePreDeclared: 14.5,
    calculatedPayout: 108900, // 45 * 2420 (MSP 2320 + TN Bonus 100)
    securityHash: "AGZ-8841-0042-THJ",
    dbtBank: "Canara Bank (••••4402)",
    patta: "184/2A",
    surveyNo: "184/2A, 191/1",
    createdAt: "2026-09-16 18:20",
    smsSent: true
  },
  {
    id: "TKN-0043",
    tokenNumber: "TN-THJ-26-0043",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-4418",
    farmerName: "Lakshmi Narayanan",
    village: "Mannargudi",
    crop: "Paddy (CR 1009)",
    cropCategory: "Grade A Paddy",
    quantityQuintals: 55.0,
    vehicleType: "Tractor",
    vehicleNumber: "TN-50-K-1920",
    slotDate: "2026-09-17",
    slotTime: "11:30 AM - 12:30 PM",
    recommendedArrival: "11:15 AM",
    status: "IN_QUEUE",
    queuePosition: 3,
    estimatedTurnTime: "11:20 AM",
    securityHash: "AGZ-4418-5510-TRV"
  },
  {
    id: "TKN-0044",
    tokenNumber: "TN-THJ-26-0044",
    centreId: "DPC-THJ-01",
    centreName: "Thanjavur South Central DPC",
    farmerId: "FMR-TN-2024-6512",
    farmerName: "Priya Venkatesh",
    village: "Lalgudi Melur",
    crop: "Paddy (ADT 45)",
    cropCategory: "Grade A Paddy",
    quantityQuintals: 60.0,
    vehicleType: "Lorry (6-Wheeler)",
    vehicleNumber: "TN-45-L-6611",
    slotDate: "2026-09-17",
    slotTime: "11:30 AM - 12:30 PM",
    recommendedArrival: "11:20 AM",
    status: "IN_QUEUE",
    queuePosition: 4,
    estimatedTurnTime: "11:35 AM",
    securityHash: "AGZ-6512-1904-TRC"
  }
];

export const MOCK_BOOKING_HISTORY = [
  {
    id: "HIST-2026-0814",
    tokenNumber: "TN-THJ-26-0014",
    centreName: "Thanjavur South Central DPC",
    season: "Kuruvai Season 2026",
    slotDate: "2026-08-20",
    crop: "Paddy (ADT 43 - Grade A)",
    quantityQuintals: 52.0,
    moisturePercent: 14.1,
    gradeClassification: "Grade A (Zero Discoloration)",
    netWeightQuintals: 52.0,
    tareWeightKg: 2900,
    grossWeightKg: 8100,
    mspRate: 2320,
    stateBonus: 100,
    totalDisbursed: 125840,
    paymentStatus: "CREDITED_VIA_DBT",
    paymentDate: "2026-08-22",
    utrNumber: "UTRIB2026082299841024",
    bankName: "Canara Bank",
    accountNumber: "••••••••4402",
    weighmentSlipNo: "TNCSC/THJ/WS/2026-8941"
  },
  {
    id: "HIST-2026-0302",
    tokenNumber: "TN-THJ-26-0004",
    centreName: "Orathanadu Model DPC",
    season: "Thaladi Season 2025-26",
    slotDate: "2026-03-02",
    crop: "Paddy (CR 1009)",
    quantityQuintals: 48.5,
    moisturePercent: 14.8,
    gradeClassification: "Grade A",
    netWeightQuintals: 48.5,
    totalDisbursed: 114460,
    paymentStatus: "CREDITED_VIA_DBT",
    paymentDate: "2026-03-04",
    utrNumber: "UTRIB2026030488219011",
    bankName: "Canara Bank",
    accountNumber: "••••••••4402",
    weighmentSlipNo: "TNCSC/ORT/WS/2026-1120"
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "NOTIF-01",
    targetRole: "farmer",
    title: "Queue Advance Alert",
    tamilTitle: "வரிசை முன்னேற்ற எச்சரிக்கை",
    message: "Counter #3 has called Token #40. Your Token #42 is now 2 positions away. Please ensure your vehicle is staged near Gate 2.",
    tamilMessage: "கவுண்டர் #3 டோக்கன் #40 ஐ அழைத்துள்ளது. உங்கள் டோக்கன் #42 இன்னும் 2 இடங்களில் உள்ளது. உங்கள் டிராக்டரை வாயில் 2 அருகே தயார் நிலையில் வைக்கவும்.",
    type: "QUEUE_ALERT",
    timestamp: "10:45 AM",
    read: false,
    priority: "HIGH"
  },
  {
    id: "NOTIF-02",
    targetRole: "farmer",
    title: "Slot Booking Confirmed",
    message: "Your procurement slot at Thanjavur South Central DPC is confirmed for today, 11:00 AM - 12:00 PM. Digital Token: TN-THJ-26-0042.",
    type: "BOOKING_CONFIRMATION",
    timestamp: "Yesterday, 06:20 PM",
    read: true,
    priority: "MEDIUM"
  },
  {
    id: "NOTIF-03",
    targetRole: "staff",
    title: "Moisture Sensor Recalibration Required",
    message: "Standard daily calibration check due for Sensor #02 in Quality Lab (Counter 3). Last calibrated at 07:30 AM.",
    type: "SYSTEM_MAINTENANCE",
    timestamp: "10:15 AM",
    read: false,
    priority: "MEDIUM"
  },
  {
    id: "NOTIF-04",
    targetRole: "staff",
    title: "Trailer Staging Buffer Notice",
    message: "6 tractors currently staged in holding yard. Gate 1 entry smooth. Queue moving at 8.2 mins/lot.",
    type: "OPERATIONAL",
    timestamp: "09:50 AM",
    read: true,
    priority: "LOW"
  },
  {
    id: "NOTIF-05",
    targetRole: "admin",
    title: "High Rush Alert: Orathanadu DPC",
    message: "Orathanadu Model DPC has exceeded 85% daily capacity (440/500 Qtl). Average wait time spiked to 38 mins. Diverting standby booking quota to Thanjavur South.",
    type: "BOTTLENECK_ALERT",
    timestamp: "10:30 AM",
    read: false,
    priority: "CRITICAL"
  },
  {
    id: "NOTIF-06",
    targetRole: "admin",
    title: "Daily DBT Settlement Milestone",
    message: "₹3.82 Crore successfully disbursed across 48 DPCs in Delta region today. Zero pending Aadhaar mismatches.",
    type: "FINANCIAL",
    timestamp: "10:00 AM",
    read: true,
    priority: "LOW"
  }
];

export const MOCK_ADMIN_DISTRICTS = [
  {
    district: "Thanjavur",
    activeCentres: 14,
    intakeTodayQuintals: 5820,
    targetQuintals: 7000,
    activeFarmers: 294,
    avgWaitMinutes: 21,
    status: "NORMAL", // NORMAL, MODERATE, HIGH_BACKLOG
    dbtDisbursedLakhs: 140.84
  },
  {
    district: "Tiruvarur",
    activeCentres: 11,
    intakeTodayQuintals: 4610,
    targetQuintals: 5500,
    activeFarmers: 230,
    avgWaitMinutes: 24,
    status: "NORMAL",
    dbtDisbursedLakhs: 111.56
  },
  {
    district: "Nagapattinam",
    activeCentres: 8,
    intakeTodayQuintals: 3100,
    targetQuintals: 4000,
    activeFarmers: 162,
    avgWaitMinutes: 34,
    status: "MODERATE",
    dbtDisbursedLakhs: 75.02
  },
  {
    district: "Mayiladuthurai",
    activeCentres: 6,
    intakeTodayQuintals: 2420,
    targetQuintals: 3000,
    activeFarmers: 118,
    avgWaitMinutes: 19,
    status: "NORMAL",
    dbtDisbursedLakhs: 58.56
  },
  {
    district: "Tiruchirappalli",
    activeCentres: 5,
    intakeTodayQuintals: 1650,
    targetQuintals: 2500,
    activeFarmers: 88,
    avgWaitMinutes: 18,
    status: "NORMAL",
    dbtDisbursedLakhs: 39.93
  },
  {
    district: "Cuddalore",
    activeCentres: 4,
    intakeTodayQuintals: 850,
    targetQuintals: 1800,
    activeFarmers: 44,
    avgWaitMinutes: 46,
    status: "HIGH_BACKLOG",
    dbtDisbursedLakhs: 20.57
  }
];

export const MOCK_REPORTS = [
  {
    id: "REP-DPR-2026-0917",
    title: "Daily Procurement Report (DPR)",
    period: "17-Sep-2026 (Live)",
    generatedBy: "System Automated (TNCSC HQ)",
    size: "1.4 MB",
    type: "PDF",
    recordsCount: 48,
    summary: "Complete breakdown of 18,450 Quintals procured across 48 DPCs with Grade A vs Common distribution."
  },
  {
    id: "REP-DBT-2026-0916",
    title: "PFMS / DBT Settlement Statement",
    period: "16-Sep-2026",
    generatedBy: "Finance & Accounts Dept",
    size: "2.8 MB",
    type: "XLSX",
    recordsCount: 940,
    summary: "Bank-wise electronic credit batch status for ₹4.12 Crore transferred directly to farmer Aadhaar-linked accounts."
  },
  {
    id: "REP-MILL-2026-W37",
    title: "Direct Hulling Mill Allocation Roster",
    period: "Week 37, Sep 2026",
    generatedBy: "Civil Supplies Storage Division",
    size: "820 KB",
    type: "PDF",
    recordsCount: 112,
    summary: "Logistics schedule of dispatched paddy consignments from DPC storage yards to modern hulling rice mills."
  }
];

export const MOCK_FAQS = [
  {
    q: "What is the maximum permissible moisture level for Paddy procurement?",
    a: "Under Government of India and Tamil Nadu Civil Supplies Corporation standards, Paddy with moisture up to 17.0% is accepted without any price deduction. For moisture between 17.1% and 19.0%, farmers may use the DPC drying yard free of charge to sun-dry lots before formal weighing."
  },
  {
    q: "How does the Agrizen Recommended Arrival Time (ETA) work?",
    a: "Agrizen dynamically calculates your arrival time based on real-time counter throughput (e.g. 8 mins per lot), the number of farmers ahead in queue, and the travel distance from your registered village. This ensures you do not wait in long tractor lines in the hot sun."
  },
  {
    q: "How soon is the Minimum Support Price (MSP) credited to my bank account?",
    a: "Once the tare weighing is recorded at Counter 4, the digital weighment slip triggers automated Direct Benefit Transfer (DBT) via PFMS. Payments are credited to your Aadhaar-linked bank account within 24 to 48 banking hours."
  },
  {
    q: "What documents should I bring to the Direct Procurement Centre (DPC)?",
    a: "Please carry: (1) Your Digital Token (on phone or printed pass), (2) Original Aadhaar Card, (3) Patta / Chitta copy or Land Adangal extract issued by the Village Administrative Officer (VAO)."
  }
];
