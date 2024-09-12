// src/pages/VetAppointments.js
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, addDoc, collection, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const VetAppointments = () => {
  const { currentUser } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vetLocation, setVetLocation] = useState('');
  const [vetName, setVetName] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});

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

    const fetchAppointments = async () => {
      if (currentUser) {
        const q = query(collection(db, 'availableAppointments'), where('vetId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));



        const appointmentEvents = appointments.map(app => ({
          title: app.clientId? `Client: ${app.clientId}` : 'Availability',
          start: new Date(`${app.date}T${app.time}`),
          end: new Date(`${app.date}T${app.time}`),
          id: app.id,
          booked: app.booked,
          date: app.date,
          time: app.time
        }));

        //alert(availabilityEvents[0].title);
        setEvents(appointmentEvents);
      }
    };

    fetchVetDetails();
    fetchAppointments();
    //setSelectedAppointment({});
  }, [currentUser]);

  const handleAddAvailableAppointment = async () => {
    if (date && time && vetLocation && vetName) {
      const ref = await addDoc(collection(db, 'availableAppointments'), {
        vetId: currentUser.uid,
        vetName: vetName,
        vetLocation: vetLocation,
        date: date,
        time: time,
        booked: false, // Ensure this field is added
      });
      alert('Available appointment slot added successfully');
      setEvents(events.concat([{
        title: 'Availability',
        start: new Date(`${date}T${time}`),
        end: new Date(`${date}T${time}`),
        id: ref.id,
        booked: false,
        date: date,
        time: time
      }]));
      setDate('');
      setTime('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedAppointment({
      id: event.id,
      booked: event.booked,
      date: event.date,
      time: event.time
    });
  };

  const handleSetSelectedDate = (d) => {
    setSelectedAppointment({date: d, ...selectedAppointment});
  };

  const handleSetSelectedTime = (t) => {
    setSelectedAppointment({time: t, ...selectedAppointment});
  };

  const handleDeleteAppointment = async () => {
    if (selectedAppointment.id) {
      if (selectedAppointment.booked) {
        const appointmentRef = doc(db, "appointments", selectedAppointment.id);
        try {
          await deleteDoc(appointmentRef);
        } catch (error) {
          console.error("Error deleting appointment:", error);
        }
        const availabilityRef = doc(db, "availableAppointments", selectedAppointment.id);
        try {
          await updateDoc(availabilityRef, {
            booked: false,
            clientId: ''
          });
        } catch (error) {
          console.error("Error deleting appointment:", error);
        }
      } else {
        const appointmentRef = doc(db, "availableAppointments", selectedAppointment.id);
        try {
          await deleteDoc(appointmentRef);
        } catch (error) {
          console.error("Error deleting appointment:", error);
        }
      }
      alert("apppointment deleted successfully");
      setEvents(events.filter((event) => event.id !== selectedAppointment.id));
      setSelectedAppointment({});
    } else {
      alert('Please select an appointment');
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
      <Typography variant="h6" gutterBottom>
      Selected Appointment
      </Typography>
      {selectedAppointment.id? (
            <Card className="appointments-card">
            <CardContent>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Date"
                type="date"
                value={selectedAppointment.date}
                onChange={(e) => handleSetSelectedDate(e.target.value)}
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
                value={selectedAppointment.time}
                onChange={(e) => handleSetSelectedTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleDeleteAppointment}
                sx={{ mt: 2 }}
              >
                {selectedAppointment.booked? 'Cancel Appointment' : 'Delete Availability'}
              </Button>
              
            </CardContent>
          </Card>
          ) : (
            <Typography>No Selected Appointment</Typography>
          )}
      
      
      <Box sx={{ mt: 3 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
          />
      </Box>
    </Box>
  );
};

export default VetAppointments;
