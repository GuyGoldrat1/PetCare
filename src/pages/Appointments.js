// src/pages/Appointments.js
import React, { useState, useEffect } from 'react';
import { Box, Typography,Grid, Button, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../context/AuthContext';
import { getDocs, collection, query, where, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ChooseDoctor from '../components/ChooseDoctor'; // Import your new DataGrid component


const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { currentUser } = useAuth();
  const [vets, setVets] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');

  useEffect(() => {
      const fetchVets = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'vet'));
      const querySnapshot = await getDocs(q);
      const vetsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVets(vetsList);
    };

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
    fetchVets();
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
    const HandleClick = (vet) => {
    // Add logic to delete the appointment by id from Firestore
    console.log('Deleting appointment with id:', vet);
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
            <ChooseDoctor vets={vets} HandleClick={HandleClick} />
        </Grid>

        
        <Grid item xs={12} md={6}>
        <Paper sx={{ ml:4, padding:3 }}>

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
                  </Paper>

        </Grid>
      
        <Grid item xs={12} md={6} >
          <Paper  sx={{mr: 4, padding:3  }}>
            <Typography variant="h5" gutterBottom>
              Available Appointments Calendar
            </Typography>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
              onSelectEvent={handleSelectEvent}
            />
          </Paper>
          </Grid>
        </Grid>
    </LocalizationProvider>
  );
};

export default Appointments;
