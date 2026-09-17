import React from 'react';
import { AgrizenProvider, useAgrizen } from './context/AgrizenContext';
import { GlobalShell } from './components/common/GlobalShell';
import { FarmerPortal } from './screens/farmer/FarmerPortal';
import { StaffPortal } from './screens/staff/StaffPortal';
import { AdminPortal } from './screens/admin/AdminPortal';

// Styles
import './styles/design-system.css';
import './styles/components.css';
import './styles/farmer.css';
import './styles/staff.css';
import './styles/admin.css';

function MainRouter() {
  const { role } = useAgrizen();

  return (
    <GlobalShell>
      {role === 'farmer' && <FarmerPortal />}
      {role === 'staff' && <StaffPortal />}
      {role === 'admin' && <AdminPortal />}
    </GlobalShell>
  );
}

export default function App() {
  return (
    <AgrizenProvider>
      <MainRouter />
    </AgrizenProvider>
  );
}
