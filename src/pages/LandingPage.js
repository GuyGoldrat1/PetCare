import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Box, Typography, Container, Paper, Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import PetCareLogo from '../assets/petcare-logo.png'; // Make sure to import your logo
import VetImage from '../assets/vet-image.png'; // Replace with your vet image path
import DogImage from '../assets/dog-image.png'; // Replace with your dog image path

const GoogleButton = styled(Button)({
  backgroundColor: '#4285F4',
  color: 'white',
  '&:hover': {
    backgroundColor: '#357ae8',
  },
  '& .MuiButton-startIcon': {
    marginRight: '10px',
  },
});

const BackgroundBox = styled(Box)({
  background: 'linear-gradient(to bottom, #e3f2fd, #bbdefb)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
});

const StyledPaper = styled(Paper)({
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  textAlign: 'center',
  position: 'relative',
});

const SignUpButton = styled(Button)({
  position: 'absolute',
  bottom: '-20px',
  width: 'calc(50% - 10px)',
});

const clearSiteData = () => {
  // Clear localStorage
  //localStorage.clear();

  // Clear sessionStorage
  sessionStorage.clear();

  // Clear cookies
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  // Clear IndexedDB
  if (window.indexedDB) {
    window.indexedDB.databases().then((databases) => {
      databases.forEach((db) => {
        window.indexedDB.deleteDatabase(db.name);
      });
    });
  }
};

const LandingPage = () => {
  const { googlelogin, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearSiteData();
    if (currentUser) {
      if (currentUser.role === 'vet') {
        navigate('/vet-dashboard');
      } else if (currentUser.role === 'pet-owner') {
        navigate('/user-dashboard');
      }
    }
  }, [currentUser, navigate]);

  return (
    <BackgroundBox>
      <Container component="main">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <img src={VetImage} alt="Vet" style={{ width: '100%', maxWidth: '375px', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper elevation={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={PetCareLogo} alt="PetCare Logo" style={{ width: '200px', marginBottom: '20px' }} />
                <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: '20px' }}>
                  Welcome to PetCare
                </Typography>
                <Typography variant="body1" align="center" sx={{ marginBottom: '30px' }}>
                  PetCare is dedicated to providing the best possible care for your pets by connecting you with trusted veterinarians. Our platform allows you to easily manage your pet's medical history, book appointments, and access vital information about your pet's health and wellbeing.
                </Typography>
                <Box sx={{ width: '100%' }}>
                  <GoogleButton
                    variant="contained"
                    startIcon={<img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />}
                    onClick={googlelogin}
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                  >
                    Sign in with Google
                  </GoogleButton>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    <GoogleButton
                      variant="contained"
                      component={Link}
                      fullWidth
                      to={{ pathname: '/login', search: '?role=pet-owner' }}
                      sx={{ marginBottom: '20px', right: '0', backgroundColor: '#4285F4', color: 'white', '&:hover': { backgroundColor: '#357ae8' } }}
                    >
                      Sign In with password
                    </GoogleButton>
                    
                  </Box>
                  <Typography variant="body2" align="center" sx={{ marginBottom: '20px' }}>or</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    <SignUpButton
                      variant="contained"
                      component={Link}
                      to={{ pathname: '/sign-up', search: '?role=vet' }}
                      sx={{ left: '0', backgroundColor: '#4285F4', color: 'white', '&:hover': { backgroundColor: '#357ae8' } }}
                    >
                      Sign Up as Vet
                    </SignUpButton>
                    <SignUpButton
                      variant="contained"
                      component={Link}
                      to={{ pathname: '/sign-up', search: '?role=pet-owner' }}
                      sx={{ right: '0', backgroundColor: '#4285F4', color: 'white', '&:hover': { backgroundColor: '#357ae8' } }}
                    >
                      Sign Up as Pet Owner
                    </SignUpButton>
                    
                  </Box>
                  <Typography variant="body2" align="center" sx={{ marginBottom: '50px' }}>or</Typography>
                  

                </Box>
              </Box>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={DogImage} alt="Dog" style={{ width: '100%', maxWidth: '375px', height: 'auto' }} />
          </Grid>
        </Grid>
      </Container>
    </BackgroundBox>
  );
};

export default LandingPage;
