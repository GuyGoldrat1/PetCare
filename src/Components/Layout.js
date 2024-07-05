import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography, Avatar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PetCareLogo from '/Users/admin/learning-react/src/assets/PetCare.png';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)', minHeight: '100vh' }}>
      <Box sx={{ background: '#f0f8ff', display: 'flex', justifyContent: 'center', mb: 3 }}>
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: `1px solid #ddd`, borderRadius: '25px', padding: '10px 20px', background: 'linear-gradient(to right, #eceff1, #ffffff)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '80%', margin: '20px auto' }}>
          <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={PetCareLogo} alt="PetCare Logo" sx={{ marginRight: '10px', width: 150, height: 'auto', borderRadius: 0 }} />
              <nav>
                <Button startIcon={<HomeIcon />} component={RouterLink} to="/home" sx={{ my: 1, mx: 1.5 }}>
                  Home
                </Button>
                <Button startIcon={<LocalHospitalIcon />} component={RouterLink} to="/medical-bag" sx={{ my: 1, mx: 1.5 }}>
                  Medical Bag
                </Button>
                <Button startIcon={<EventIcon />} component={RouterLink} to="/vet-appointments" sx={{ my: 1, mx: 1.5 }}>
                  Vet Appointments
                </Button>
                <Button startIcon={<ChatIcon />} component={RouterLink} to="/chat" sx={{ my: 1, mx: 1.5 }}>
                  Chat 24/7
                </Button>
                <Button startIcon={<InfoIcon />} component={RouterLink} to="/about" sx={{ my: 1, mx: 1.5 }}>
                  About
                </Button>
                <Button startIcon={<ContactMailIcon />} component={RouterLink} to="/contact" sx={{ my: 1, mx: 1.5 }}>
                  Contact
                </Button>
              </nav>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" color="inherit" noWrap sx={{ marginRight: '20px', fontWeight: 'bold' }}>
                Elad Kadosh
              </Typography>
              <IconButton color="inherit" onClick={handleSignOut}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
