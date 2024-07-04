import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './Components/Layout';
import LandingPage from './LandingPage';
import MedicalBag from './Components/MedicalBag';
import VetAppointments from './Components/Appointments';
import Chat from './Components/Chat';
import About from './Components/About';
import Contact from './Components/Contact';
import SignIn from './Components/SignIn';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Layout><LandingPage /></Layout>} />
          <Route path="/medical-bag" element={<Layout><MedicalBag /></Layout>} />
          <Route path="/vet-appointments" element={<Layout><VetAppointments /></Layout>} />
          <Route path="/chat" element={<Layout><Chat /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
