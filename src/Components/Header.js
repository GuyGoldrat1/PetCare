import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PetCare
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/medical-bag')}>Medical Bag</Button>
          <Button color="inherit" onClick={() => navigate('/vet-appointments')}>Vet Appointments</Button>
          <Button color="inherit" onClick={() => navigate('/chat')}>Chat 24/7</Button>
          <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
          <Typography variant="body1" sx={{ ml: 2 }}>Elad Kadosh</Typography>
          <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
