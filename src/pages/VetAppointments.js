// src/pages/VetAppointments.js
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const VetAppointments = () => {
  const { currentUser } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vetLocation, setVetLocation] = useState('');
  const [vetName, setVetName] = useState('');

  useEffect(() => {
    const fetchVetDetails = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setVetLocation(userData.location || '');
          setVetName(userData.name || '');
        }
      }
    };

    fetchVetDetails();
  }, [currentUser]);

  const handleAddAvailableAppointment = async () => {
    if (date && time && vetLocation && vetName) {
      await addDoc(collection(db, 'availableAppointments'), {
        vetId: currentUser.uid,
        vetName: vetName,
        vetLocation: vetLocation,
        date: date,
        time: time,
        booked: false, // Ensure this field is added
      });
      alert('Available appointment slot added successfully');
      setDate('');
      setTime('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <Box className="appointments-container">
      <Typography variant="h4" gutterBottom>
        Add Available Appointment Slots
      </Typography>
      <Card className="appointments-card">
        <CardContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Vet Name"
            value={vetName}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Location"
            value={vetLocation}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddAvailableAppointment}
            sx={{ mt: 2 }}
          >
            Add Appointment Slot
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VetAppointments;
