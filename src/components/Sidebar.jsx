// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText,Avatar, Box, Typography, IconButton, Divider, Collapse, useTheme } from '@mui/material';
import { Dashboard, LocalHospital, Event, Help, Info, MedicalServices, Menu, ChevronLeft, Vaccines, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const Sidebar = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  const [open, setOpen] = useState(true);
  const [petInfo, setPetInfo] = useState({});

  useEffect(() => {
    const fetchPetInfo = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setPetInfo(userDoc.data());
        } else {
          console.error('No such document!');
        }
      }
    };

    fetchPetInfo();
  }, [currentUser]);


  const handleToggleSidebar = () => {
    setOpen(!open);

  };

  return (
    <Box sx={{ display: 'flex',}}>
      <Collapse in={open} orientation="horizontal" sx={{ height: '100vh', transition: 'width 0.3s', width: open ? 250 : 60 }}>
        <Box sx={{ 
          width: open ? 250 : 60, 
          height: '100vh', 
          position: 'fixed',
          background: 'linear-gradient( #045292,#63b6e3)',

        }}>
          <IconButton onClick={handleToggleSidebar} sx={{ position: 'absolute', top: 10, right: 10, color: "primary" }}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <Box sx={{ textAlign: 'center', p: open ? 2 : 1 }}>
            {open && (
              <Typography variant="h1" sx={{ mt: 3 }}>
                PetCare
              </Typography>
            )}
            <Avatar 
          
              src={role === 'pet-owner' ? petInfo.petImageUrl || 'default-pet-image.jpg' : petInfo.vetImageUrl || 'default-vet-image.jpg'}
              alt={role === 'pet-owner' ? "Pet" : "Vet"}
              sx={{ width: 150, height: 150, mb: 0,mt: 2, mx: 'auto' }}
            />

          </Box>
        
          <List sx={{color: 'text.secondary', ml: 3}}>
            {role === 'pet-owner' ? (
              <>
                <ListItem button component={Link} to="/user-dashboard">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <Dashboard />
                  </ListItemIcon>
                  {open && <ListItemText primary="Dashboard" />}
                </ListItem>
                <ListItem>
                  <Typography variant="h6" color="textSecondary">
                    History
                  </Typography>
                </ListItem>
                <ListItem button component={Link} to="/medical-history">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <MedicalServices />
                  </ListItemIcon>
                  {open && <ListItemText primary="Medical History" />}
                </ListItem>
                <ListItem button component={Link} to="/vaccinations">
                  <ListItemIcon sx={{ color: '#55AD9B' }}>
                    <Vaccines />
                  </ListItemIcon>
                  {open && <ListItemText primary="Vaccinations" />}
                </ListItem>
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
                <ListItem button component={Link} to="/vet-dashboard" sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ color: "text.secondary" }}>
                    <Dashboard />
                  </ListItemIcon>
                  {open && <ListItemText primary="Dashboard"/>}
                </ListItem>
                <ListItem button component={Link} to="/vet-appointments">
                  <ListItemIcon sx={{ color: "text.secondary" }}>
                    <Event />
                  </ListItemIcon>
                  {open && <ListItemText primary="appointments" />}
                </ListItem>
                <ListItem button component={Link} to="/vet-patients">
                  <ListItemIcon sx={{ color: 'text.secondary' }}>
                    <LocalHospital />
                  </ListItemIcon>
                  {open && <ListItemText primary="Patients" />}
                </ListItem>
              </>
            )}
            <ListItem button component={Link} to="/faq">
              <ListItemIcon sx={{ color: 'text.secondary' }}>
                <Help />
              </ListItemIcon>
              {open && <ListItemText primary="FAQ Page" />}
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemIcon sx={{ color: 'text.secondary' }}>
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
