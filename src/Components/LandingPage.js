import React from 'react';
import { Box, Button, Grid, Typography, Container, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ChaseImage from '../assets/chase-back.png';
import PetCareLogo from '/Users/admin/learning-react/src/assets/PetCare.png';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, Roboto Slab, Roboto Slab',
    h2: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 400,
    },
    button: {
      fontStyle: 'italic',
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

function LandingPageContent() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)', minHeight: '100vh' }}>
        <main>
          <Box sx={{ pt: 0, pb: 0 }}>
            <Container maxWidth="md">
            <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={9}>
                <Typography component="h1" variant="h2" align="left" color="text.primary" gutterBottom>
                Pet Health <span style={{ color: '#1976d2' }}>Record</span>
                </Typography>
                <Typography variant="h5" align="left" color="text.secondary" paragraph>
                Keep track of your pet's health records and ensure they receive the best care.
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'left' }}>
                <Button variant="contained" color="primary" sx={{ mx: 1 }} component={RouterLink} to="/about">
                    Learn More
                </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={3}>
                <Box sx={{ width: '120%', height: 'auto', mb: 2, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                    width: '280px',
                    height: '240px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 5,
                }}>
                    <img src={ChaseImage} alt="Chase" style={{ width: '300%', height: 'auto', borderRadius: '8px', marginLeft: '20px' }} />
                </Box>
                </Box>
            </Grid>
            </Grid>

            </Container>
          </Box>

          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={10} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', boxShadow: 3, borderRadius: 2, width: '110%', wordWrap: 'break-word' }}>
                  <Typography variant="h5" sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Pet Information</Typography>
                  {[
                    { label: "Name", value: "Chase" },
                    { label: "Gender", value: "Male" },
                    { label: "Age", value: "13" },
                    { label: "Weight", value: "20 kg" },
                    { label: "Birth Date", value: "21/07/2011" },
                    { label: "Breed", value: "Beagle" }
                  ].map(info => (
                    <Box key={info.label} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 'regular' }}>{info.label}:</Typography>
                      <Typography sx={{ fontSize: '1.5rem' }}>{info.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', boxShadow: 3, borderRadius: 2, width: '110%', wordWrap: 'break-word' }}>
                  <Typography variant="h5" sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Health Concerns</Typography>
                  {[
                    { label: "Allergies", value: "None" },
                    { label: "Existing Conditions", value: "None" },
                    { label: "Veterinarian", value: "Dr. Smith" }
                  ].map(info => (
                    <Box key={info.label} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 'regular' }}>{info.label}:</Typography>
                      <Typography sx={{ fontSize: '1.5rem' }}>{info.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', boxShadow: 3, borderRadius: 2, width: '120%', wordWrap: 'break-word' }}>
                  <Typography variant="h5" sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Owner's Information</Typography>
                  {[
                    { label: "Name", value: "Elad Kadosh" },
                    { label: "Phone", value: "054-7870214" },
                    { label: "Email", value: "elad.kadosh3@gmail.com" },
                    { label: "Address", value: "Hagalil 91, Ganey Tikva" }
                  ].map(info => (
                    <Box key={info.label} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 'regular' }}>{info.label}:</Typography>
                      <Typography sx={{ fontSize: '1.5rem' }}>{info.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </main>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            <Avatar src={PetCareLogo} alt="PetCare Logo" sx={{ width: 200, height: 'auto', mx: 'auto' }} />
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Keeping your pet's health in check!
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function LandingPage() {
  return <LandingPageContent />;
}
