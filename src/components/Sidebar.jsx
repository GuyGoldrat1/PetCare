// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, IconButton, Divider, Collapse, useTheme } from '@mui/material';
import { Dashboard, LocalHospital, Event, Help, Info, MedicalServices, Menu, ChevronLeft, Vaccines, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('themeMode', 'light');
  }, []);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Collapse in={open} orientation="horizontal" sx={{ height: '100vh', transition: 'width 0.3s', width: open ? 250 : 60 }}>
        <Box sx={{ 
          width: open ? 250 : 60, 
          bgcolor: theme.palette.mode === 'dark' ? 'black' : 'lightgray', 
          height: '100vh', 
          position: 'relative' 
        }}>
          <IconButton onClick={handleToggleSidebar} sx={{ position: 'absolute', top: 10, right: 10, color: '#55AD9B' }}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <Box sx={{ textAlign: 'center', p: open ? 2 : 1 }}>
            {open && (
              <Typography variant="h3" sx={{ mt: 4 }}>
                PetCare
              </Typography>
            )}
          </Box>
          <List>
            {role === 'pet-owner' ? (
              <>
                <ListItem button component={Link} to="/user-dashboard">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <Dashboard />
                  </ListItemIcon>
                  {open && <ListItemText primary="Dashboard" />}
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="h6" color="textSecondary">
                    History
                  </Typography>
                </ListItem>
                <ListItem button component={Link} to="/medical-bag">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <MedicalServices />
                  </ListItemIcon>
                  {open && <ListItemText primary="Medical Bag" />}
                </ListItem>
                <ListItem button component={Link} to="/vaccinations">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <Vaccines />
                  </ListItemIcon>
                  {open && <ListItemText primary="Vaccinations" />}
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="h6" color="textSecondary">
                    Appointments
                  </Typography>
                </ListItem>
                <ListItem button component={Link} to="/doctors">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <AccountCircle />
                  </ListItemIcon>
                  {open && <ListItemText primary="Doctors" />}
                </ListItem>
                <ListItem button component={Link} to="/appointments">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <Event />
                  </ListItemIcon>
                  {open && <ListItemText primary="New Appointment" />}
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/vet-dashboard">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <Dashboard />
                  </ListItemIcon>
                  {open && <ListItemText primary="Dashboard" />}
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="h6" color="textSecondary">
                    Medical
                  </Typography>
                </ListItem>
                <ListItem button component={Link} to="/vet-appointments">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <Event />
                  </ListItemIcon>
                  {open && <ListItemText primary="Appointments" />}
                </ListItem>
                <ListItem button component={Link} to="/vet-patients">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <LocalHospital />
                  </ListItemIcon>
                  {open && <ListItemText primary="Patients" />}
                </ListItem>
              </>
            )}
            <Divider />
            <ListItem>
              <Typography variant="h6" color="textSecondary">
                More
              </Typography>
            </ListItem>
            <ListItem button component={Link} to="/faq">
              <ListItemIcon sx={{ color: '#55AD9B' }}>
                <Help />
              </ListItemIcon>
              {open && <ListItemText primary="FAQ Page" />}
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemIcon sx={{ color: '#55AD9B' }}>
                <Info />
              </ListItemIcon>
              {open && <ListItemText primary="About" />}
            </ListItem>
          </List>
        </Box>
      </Collapse>
      {!open && (
        <IconButton onClick={handleToggleSidebar} sx={{ position: 'fixed', top: 10, left: 10, color: '#55AD9B' }}>
          <Menu />
        </IconButton>
      )}
    </Box>
  );
};

export default Sidebar;
