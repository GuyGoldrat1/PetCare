// src/pages/Appointments.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../context/AuthContext';
import { getDocs, collection, query, where, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { currentUser } = useAuth();
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');

  useEffect(() => {
    const fetchAvailableAppointments = async () => {
      try {
        const q = query(collection(db, 'availableAppointments'), where('booked', '==', false));
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAvailableAppointments(appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAvailableAppointments();
  }, []);

  const handleBookAppointment = async () => {
    if (selectedAppointment) {
      const appointmentToBook = availableAppointments.find(appointment => appointment.id === selectedAppointment);
      if (appointmentToBook) {
        if (!appointmentToBook.vetName || !appointmentToBook.vetId || !appointmentToBook.date || !appointmentToBook.time) {
          console.error('Missing required fields in appointmentToBook:', appointmentToBook); 
          alert('Error: Missing required fields in appointment data.');
          return;
        }

        const appointmentRef = doc(db, 'availableAppointments', appointmentToBook.id);

        // Add to the 'appointments' collection
        await addDoc(collection(db, 'appointments'), {
          vetId: appointmentToBook.vetId,
          vetName: appointmentToBook.vetName,
          clientId: currentUser.uid,
          clientEmail: currentUser.email,
          clientName: currentUser.displayName,
          date: appointmentToBook.date,
          time: appointmentToBook.time,
        });

        // Mark as booked in the 'availableAppointments' collection
        await updateDoc(appointmentRef, {
          booked: true,
          clientId: currentUser.uid,
        });

        alert('Appointment booked successfully');
        setAvailableAppointments(availableAppointments.filter(appointment => appointment.id !== appointmentToBook.id));
      } else {
        alert('Selected appointment slot is not available.');
      }
    } else {
      alert('Please select an appointment');
    }
  };

  const events = availableAppointments.map(appointment => ({
    title: `${appointment.vetName} 
    at: ${appointment.time}`,
    start: new Date(`${appointment.date}T${appointment.time}`),
    end: new Date(`${appointment.date}T${appointment.time}`),
    id: appointment.id,
  }));

  const handleSelectEvent = (event) => {
    setSelectedAppointment(event.id);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Book Appointment
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Available Appointments</InputLabel>
          <Select
            value={selectedAppointment}
            onChange={(e) => setSelectedAppointment(e.target.value)}
          >
            {availableAppointments.length > 0 ? (
              availableAppointments.map((appointment) => (
                <MenuItem key={appointment.id} value={appointment.id}>
                  {`Vet: ${appointment.vetName}, Date: ${appointment.date}, Time: ${appointment.time}`}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                No available appointments
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleBookAppointment}
          sx={{ mt: 2 }}
        >
          Book Appointment
        </Button>
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <CalendarTodayIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" gutterBottom>
              Available Appointments Calendar
            </Typography>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleSelectEvent}
            />
          </Paper>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Appointments;
