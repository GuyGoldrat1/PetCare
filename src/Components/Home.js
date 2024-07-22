import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import ChaseImage from '../assets/chase-white.png';

function Home() {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)', minHeight: '100vh' }}>
      <Box sx={{ pt: 8, pb: 6 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Pet Health <span style={{ color: '#1976d2' }}>Record</span>
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Keep track of your pet's health records and ensure they receive the best care.
        </Typography>
      </Box>
      <Box sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
          <Avatar src={ChaseImage} alt="Chase" sx={{ width: '100%', height: 'auto', mb: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2, width: '100%' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Name: <span style={{ fontWeight: 'normal' }}>Chase</span></Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Gender: <span style={{ fontWeight: 'normal' }}>Male</span></Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Age: <span style={{ fontWeight: 'normal' }}>13</span></Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Weight: <span style={{ fontWeight: 'normal' }}>20 kg</span></Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Birth Date: <span style={{ fontWeight: 'normal' }}>21/07/2011</span></Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Breed: <span style={{ fontWeight: 'normal' }}>Beagle</span></Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Home;
