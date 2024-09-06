// src/pages/Vaccinations.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const Vaccinations = () => {
  const { currentUser } = useAuth();
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    const fetchVaccinations = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'medicalRecords'),
          where('clientId', '==', currentUser.uid),
          where('treatmentType', '==', 'Vaccination')
        );
        const querySnapshot = await getDocs(q);
        const vaccinationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVaccinations(vaccinationsList);
      }
    };

    fetchVaccinations();
  }, [currentUser]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'regular' }}>
        Vaccinations
      </Typography>
      {vaccinations.length > 0 ? (
        <Grid container spacing={3}>
          {vaccinations.map((vaccination) => (
            <Grid item xs={12} sm={6} md={4} key={vaccination.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                  <VaccinesIcon />
                </Avatar>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    {vaccination.summary}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {vaccination.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Vet: {vaccination.vetName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No vaccinations found</Typography>
      )}
    </Box>
  );
};

export default Vaccinations;
