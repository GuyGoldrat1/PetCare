import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from './Layout';
import LandingPage from './LandingPage';
import MedicalBag from './MedicalBag';
import VetAppointments from './Appointments';
import Chat from './Chat';
import About from './About';
import Contact from './Contact';
import SignIn from './SignIn';

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
