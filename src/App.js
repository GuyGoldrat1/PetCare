import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboard from './pages/UserDashboard';
import VetDashboard from './pages/VetDashboard';
import MedicalHistory from './pages/MedicalHistory';
import Appointments from './pages/Appointments';
import VetAppointments from './pages/VetAppointments';
import VetPatients from './pages/VetPatients';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Sidebar from './components/Sidebar';
import TopRightIcons from './components/TopRightIcons';
import Doctors from './pages/Doctors';
import Vaccinations from './pages/Vaccinations'; 
import Login from './pages/LoginPage'; 


const App = () => {
  const location = useLocation();
  const hideMenuPaths = ['/', '/login', '/sign-up'];

  return (
        <div style={{ display: 'flex' }}>
          {!hideMenuPaths.includes(location.pathname) && <Sidebar />}
          <div style={{ flexGrow: 1 }}>
            {!hideMenuPaths.includes(location.pathname) && <TopRightIcons />}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/vet-dashboard" element={<VetDashboard />} />
              <Route path="/medical-history" element={<MedicalHistory />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/vet-appointments" element={<VetAppointments />} />
              <Route path="/vet-patients" element={<VetPatients />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/vaccinations" element={<Vaccinations />} /> 
            </Routes>
          </div>
        </div>
  );
};

export default App;
