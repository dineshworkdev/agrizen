import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_FARMERS,
  MOCK_CENTRES,
  MOCK_COUNTERS,
  MOCK_MSP_RATES,
  INITIAL_TOKENS,
  MOCK_BOOKING_HISTORY,
  MOCK_NOTIFICATIONS,
  MOCK_ADMIN_DISTRICTS,
  MOCK_REPORTS,
  MOCK_FAQS
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

const AgrizenContext = createContext(null);

export function AgrizenProvider({ children }) {
  // Global View and User State
  const [role, setRole] = useState('farmer'); // 'farmer' | 'staff' | 'admin'
  const [farmerScreen, setFarmerScreen] = useState('dashboard');
  const [staffScreen, setStaffScreen] = useState('dashboard');
  const [adminScreen, setAdminScreen] = useState('dashboard');
  const [language, setLanguage] = useState('en'); // 'en' | 'ta' | 'hi'
  const [currentUser, setCurrentUser] = useState(MOCK_FARMERS[0]); // Muthuvel Pandian
  const [activeCentreId, setActiveCentreId] = useState('DPC-THJ-01');

  // Interactive Live Data State
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [counters, setCounters] = useState(MOCK_COUNTERS);
  const [centres, setCentres] = useState(MOCK_CENTRES);
  const [bookingHistory, setBookingHistory] = useState(MOCK_BOOKING_HISTORY);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [isDelaySimulated, setIsDelaySimulated] = useState(false);

  // UI Interactive States
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // { type, data }
  const [selectedCentreDetails, setSelectedCentreDetails] = useState(MOCK_CENTRES[0]);
  const [selectedFarmerDetails, setSelectedFarmerDetails] = useState(MOCK_FARMERS[0]);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(INITIAL_TOKENS[5]); // User's token

  // Toast Notification System
  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sound Chime Effect (Web Audio API synthetic chime)
  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  // Active Centre reference
  const activeCentre = centres.find(c => c.id === activeCentreId) || centres[0];

  // User's active token (if any)
  const userToken = tokens.find(t => t.farmerId === currentUser.id && t.status !== 'COMPLETED') || null;

  // Active Screen helper depending on current role
  const getActiveScreen = () => {
    if (role === 'farmer') return farmerScreen;
    if (role === 'staff') return staffScreen;
    return adminScreen;
  };

  const setActiveScreen = (screenName) => {
    if (role === 'farmer') setFarmerScreen(screenName);
    else if (role === 'staff') setStaffScreen(screenName);
    else setAdminScreen(screenName);
  };

  // Switch Portal Role
  const switchRole = (newRole) => {
    setRole(newRole);
    addToast(`Switched view to ${TRANSLATIONS[language]?.roles?.[newRole] || newRole}`, 'info');
  };

  // Slot Booking Action
  const bookNewSlot = (formData) => {
    const nextNum = tokens.length + 37;
    const tokenNumber = `TN-THJ-26-00${nextNum}`;
    const assignedCentre = centres.find(c => c.id === formData.centreId) || centres[0];
    const mspObj = MOCK_MSP_RATES.find(r => r.cropName.includes(formData.crop)) || MOCK_MSP_RATES[0];
    const calculatedPayout = (Number(formData.quantity) || 40) * (mspObj.netPayoutPerQuintal || 2420);

    const newToken = {
      id: `TKN-00${nextNum}`,
      tokenNumber,
      centreId: assignedCentre.id,
      centreName: assignedCentre.name,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerTamilName: currentUser.tamilName,
      village: currentUser.village,
      crop: formData.crop || "Paddy (Ponni Samba)",
      cropCategory: "Grade A Paddy",
      quantityQuintals: Number(formData.quantity) || 40,
      vehicleType: formData.vehicleType || "Tractor + Trailer",
      vehicleNumber: formData.vehicleNumber || "TN-49-AA-5512",
      slotDate: formData.slotDate || "2026-09-17",
      slotTime: formData.slotTime || "01:00 PM - 02:00 PM",
      recommendedArrival: "12:45 PM",
      status: "IN_QUEUE",
      queuePosition: tokens.filter(t => t.centreId === assignedCentre.id && t.status === 'IN_QUEUE').length + 1,
      estimatedTurnTime: "01:15 PM",
      assignedCounter: "Counter 2 - Weighbridge",
      moisturePreDeclared: Number(formData.moisture) || 14.2,
      calculatedPayout,
      securityHash: `AGZ-${Math.floor(1000 + Math.random() * 9000)}-${nextNum}-THJ`,
      dbtBank: `${currentUser.bankDetails.bankName} (${currentUser.bankDetails.accountNumberMasked})`,
      patta: currentUser.pattaNumber,
      surveyNo: currentUser.surveyNumbers.join(', '),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      smsSent: true
    };

    setTokens(prev => [...prev, newToken]);
    setSelectedBookingDetails(newToken);

    // Add confirmation notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      targetRole: "farmer",
      title: "New Slot Booked Successfully",
      tamilTitle: "புதிய முன்பதிவு உறுதி செய்யப்பட்டது",
      message: `Token ${tokenNumber} generated for ${assignedCentre.name} on ${newToken.slotDate} (${newToken.slotTime}).`,
      tamilMessage: `டோக்கன் ${tokenNumber} ${assignedCentre.tamilName} நிலையத்திற்கு வெற்றிகரமாக ஒதுக்கப்பட்டுள்ளது.`,
      type: "BOOKING_CONFIRMATION",
      timestamp: "Just Now",
      read: false,
      priority: "HIGH"
    };
    setNotifications(prev => [newNotif, ...prev]);

    playChime();
    addToast(`Digital Token ${tokenNumber} generated!`, 'success');
    return newToken;
  };

  // Staff Action: Call Next Token to a counter
  const callNextToken = (counterId) => {
    // Find counter
    const targetCounter = counters.find(c => c.id === counterId) || counters[0];
    // Find next in-queue token for this centre
    const nextInQueue = tokens.find(t => t.centreId === activeCentreId && t.status === 'IN_QUEUE');

    if (!nextInQueue) {
      addToast(`No more waiting farmers in queue at ${activeCentre.name}!`, 'info');
      return;
    }

    // Advance previous token at this counter if any
    setTokens(prev => prev.map(t => {
      if (t.id === nextInQueue.id) {
        return {
          ...t,
          status: 'AT_COUNTER',
          assignedCounter: `Counter ${targetCounter.number} (${targetCounter.name})`,
          calledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          queuePosition: 0
        };
      }
      // Decrement queue position for other waiting tokens
      if (t.status === 'IN_QUEUE' && t.centreId === activeCentreId) {
        return {
          ...t,
          queuePosition: Math.max(1, t.queuePosition - 1)
        };
      }
      return t;
    }));

    // Update Counter state
    setCounters(prev => prev.map(c => {
      if (c.id === targetCounter.id) {
        return {
          ...c,
          currentServingToken: nextInQueue.tokenNumber,
          tokensProcessedToday: c.tokensProcessedToday + 1
        };
      }
      return c;
    }));

    playChime();

    // Check if user was called
    if (nextInQueue.farmerId === currentUser.id) {
      addToast(`🔔 ATTENTION: Your Token ${nextInQueue.tokenNumber} is CALLED to Counter ${targetCounter.number}!`, 'success', 6000);
      setNotifications(prev => [{
        id: `NOTIF-CALL-${Date.now()}`,
        targetRole: "farmer",
        title: `Token Called: Counter #${targetCounter.number}`,
        tamilTitle: `டோக்கன் அழைக்கப்பட்டது: கவுண்டர் #${targetCounter.number}`,
        message: `Your Token ${nextInQueue.tokenNumber} is now being processed at Counter #${targetCounter.number} (${targetCounter.name}).`,
        tamilMessage: `உங்கள் டோக்கன் ${nextInQueue.tokenNumber} தற்போது கவுண்டர் #${targetCounter.number} இல் அழைக்கப்பட்டுள்ளது.`,
        type: "TOKEN_CALLED",
        timestamp: "Just Now",
        read: false,
        priority: "CRITICAL"
      }, ...prev]);
    } else {
      addToast(`Counter ${targetCounter.number} called Token ${nextInQueue.tokenNumber} (${nextInQueue.farmerName})`, 'info');
    }
  };

  // Staff Action: Progress token status (e.g. In Inspection -> Weighed -> Completed)
  const advanceTokenStatus = (tokenId, newStatus, extraData = {}) => {
    setTokens(prev => prev.map(t => {
      if (t.id === tokenId) {
        const updated = {
          ...t,
          status: newStatus,
          ...extraData
        };
        // If completed, add to booking history
        if (newStatus === 'COMPLETED') {
          const completedRecord = {
            id: `HIST-${Date.now()}`,
            tokenNumber: updated.tokenNumber,
            centreName: updated.centreName,
            season: "Kharif / Samba 2026",
            slotDate: updated.slotDate,
            crop: updated.crop,
            quantityQuintals: updated.quantityQuintals,
            moisturePercent: updated.moisturePercent || 14.4,
            gradeClassification: "Grade A Certified",
            netWeightQuintals: updated.quantityQuintals,
            tareWeightKg: 2850,
            grossWeightKg: 2850 + (updated.quantityQuintals * 100),
            mspRate: 2320,
            stateBonus: 100,
            totalDisbursed: updated.calculatedPayout || (updated.quantityQuintals * 2420),
            paymentStatus: "CREDITED_VIA_DBT",
            paymentDate: new Date().toISOString().substring(0, 10),
            utrNumber: `UTRIB${Date.now().toString().substring(3, 14)}`,
            bankName: currentUser.bankDetails.bankName,
            accountNumber: currentUser.bankDetails.accountNumberMasked,
            weighmentSlipNo: `TNCSC/WS/2026-${Math.floor(1000 + Math.random() * 9000)}`
          };
          setBookingHistory(h => [completedRecord, ...h]);

          // Increment centre intake
          setCentres(centresPrev => centresPrev.map(c => {
            if (c.id === updated.centreId) {
              return {
                ...c,
                currentDayIntakeQuintals: c.currentDayIntakeQuintals + updated.quantityQuintals
              };
            }
            return c;
          }));
        }
        return updated;
      }
      return t;
    }));

    addToast(`Token ${tokenId} updated to ${newStatus}`, 'success');
  };

  // Toggle Weather / Rain Delay Simulation
  const toggleWeatherDelay = () => {
    setIsDelaySimulated(prev => {
      const nextVal = !prev;
      if (nextVal) {
        addToast("🌧️ Weather delay alert activated (+15 min dampness buffer)", "warning");
        // Add alert notification
        setNotifications(n => [{
          id: `NOTIF-RAIN-${Date.now()}`,
          targetRole: "farmer",
          title: "Weather Delay Advisory (+15 mins)",
          tamilTitle: "வானிலை தாமத அறிவிப்பு (+15 நிமிடம்)",
          message: "A brief cloud cover has increased yard moisture. Unloading velocity temporarily adjusted +15 mins. Please check your updated ETA.",
          tamilMessage: "மேகமூட்டம் காரணமாக உலர்த்தும் பணி 15 நிமிடம் தற்காலிகமாக தாமதமாகிறது. உங்கள் புதிய வருகை நேரத்தை சரிபார்க்கவும்.",
          type: "WEATHER_DELAY",
          timestamp: "Just Now",
          read: false,
          priority: "HIGH"
        }, ...n]);
      } else {
        addToast("☀️ Weather clear: Normal processing velocity resumed", "info");
      }
      return nextVal;
    });
  };

  // Reset Demo to initial state
  const resetDemoData = () => {
    setTokens(INITIAL_TOKENS);
    setCounters(MOCK_COUNTERS);
    setCentres(MOCK_CENTRES);
    setBookingHistory(MOCK_BOOKING_HISTORY);
    setIsDelaySimulated(false);
    setCurrentUser(MOCK_FARMERS[0]);
    addToast("All queues, tokens, and centres reset to pristine state!", "info");
  };

  // Translation lookup helper
  const t = (path) => {
    const keys = path.split('.');
    let cur = TRANSLATIONS[language] || TRANSLATIONS.en;
    for (const k of keys) {
      if (!cur || cur[k] === undefined) return path;
      cur = cur[k];
    }
    return cur;
  };

  return (
    <AgrizenContext.Provider
      value={{
        role,
        setRole: switchRole,
        activeScreen: getActiveScreen(),
        setActiveScreen,
        farmerScreen,
        setFarmerScreen,
        staffScreen,
        setStaffScreen,
        adminScreen,
        setAdminScreen,
        language,
        setLanguage,
        currentUser,
        setCurrentUser,
        activeCentreId,
        setActiveCentreId,
        activeCentre,
        userToken,
        tokens,
        counters,
        centres,
        bookingHistory,
        notifications,
        isDelaySimulated,
        toggleWeatherDelay,
        resetDemoData,
        callNextToken,
        advanceTokenStatus,
        bookNewSlot,
        toasts,
        addToast,
        removeToast,
        activeModal,
        openModal: (type, data) => setActiveModal({ type, data }),
        closeModal: () => setActiveModal(null),
        selectedCentreDetails,
        setSelectedCentreDetails,
        selectedFarmerDetails,
        setSelectedFarmerDetails,
        selectedBookingDetails,
        setSelectedBookingDetails,
        t,
        playChime
      }}
    >
      {children}
    </AgrizenContext.Provider>
  );
}

export function useAgrizen() {
  const context = useContext(AgrizenContext);
  if (!context) {
    throw new Error("useAgrizen must be used within an AgrizenProvider");
  }
  return context;
}
