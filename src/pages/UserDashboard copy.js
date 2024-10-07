import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Grid, Paper, Snackbar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Carousel from 'react-material-ui-carousel';
import MuiAlert from '@mui/material/Alert';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './UserDashboard.css';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';


const localizer = momentLocalizer(moment);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [petInfo, setPetInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);



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

    const fetchAppointments = async () => {
      if (currentUser) {
        const today = new Date().toISOString().split('T')[0];
        try {
          const q = query(
            collection(db, 'appointments'),
            where('clientId', '==', currentUser.uid),
            where('date', '>=', today)
          );
          const querySnapshot = await getDocs(q);
          const appointmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAppointments(appointmentsList);
          if (appointmentsList.length > 0) {
            const sortedAppointments = appointmentsList.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
            setNextAppointment(sortedAppointments[0]);
            setOpen(true);
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    };

    const fetchMedicalRecords = async () => {
      if (currentUser) {
        try {
          const q = query(collection(db, 'medicalRecords'), where('clientId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          const recordsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMedicalRecords(recordsList);
        } catch (error) {
          console.error('Error fetching medical records:', error);
        }
      }
    };

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

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    };

    fetchPetInfo();
    fetchAppointments();
    fetchMedicalRecords();
    fetchVaccinations();
    fetchLocation();
  }, [currentUser]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h3" 
      >
        DASHBOARD
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
        Welcome to your Dashboard!
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{borderRadius: `15px`,p: 2, textAlign: 'center', bgcolor: 'cream', color: 'primary' }}>
            <Avatar
              src={petInfo.petImageUrl || 'default-pet-image.jpg'}
              alt="Pet"
              sx={{ width: 200, height: 200, mb: 2, mx: 'auto' }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {petInfo.petName || 'Unknown'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: 'cream', color: 'primary',borderRadius: '20px' }}>
            <PetsIcon sx={{ fontSize: 40, mb: 2, color: 'tertiary.main' }} />
            <Typography variant="h5" gutterBottom>
              Pet Info
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {petInfo.petAge || 'Unknown'}
            </Typography>
            <Typography variant="body1">
              <strong>Birth Date:</strong> {petInfo.petBirthDate || 'Unknown'}
            </Typography>
            <Typography variant="body1">
              <strong>Breed:</strong> {petInfo.petBreed || 'Unknown'}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {petInfo.petGender || 'Unknown'}
            </Typography>
            <Typography variant="body1">
              <strong>Weight:</strong> {petInfo.petWeight || 'Unknown'}
            </Typography>
            <Typography variant="body1">
              <strong>Color:</strong> {petInfo.petColor || 'Unknown'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', bgcolor: 'cream', color: 'primary' }}>
            <CalendarTodayIcon sx={{ fontSize: 40, mb: 3, color: 'tertiary.main' }} />
            <Typography variant="h5" gutterBottom>
              Future Appointments
            </Typography>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <Typography key={appointment.id} variant="body1">
                  {`Date: ${appointment.date}, Time: ${appointment.time}, Vet: ${appointment.vetName}`}
                </Typography>
              ))
            ) : (
              <Typography variant="body1">No upcoming appointments</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: 'cream', color: 'primary' }}>
            <MedicalServicesIcon sx={{ fontSize: 40, mb: 1, color: 'tertiary.main' }} />
            <Typography variant="h5" gutterBottom>
              Medical Bag
            </Typography>
            <Carousel>
              {medicalRecords.map((record) => (
                <Paper key={record.id} elevation={2} sx={{ p: 2, margin: '0 10px', bgcolor: 'cream', color: 'primary' }}>
                  <Typography variant="body1">
                    <strong>Summary:</strong> {record.summary}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date:</strong> {record.date}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Vet:</strong> {record.vetName}
                  </Typography>
                </Paper>
              ))}
            </Carousel>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mt: 2, textAlign: 'center', bgcolor: 'cream', color: 'primary' }}>
            <Typography variant="h5">Age</Typography>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: '5px solid',
                borderColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mt: 1,
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary' }}>
                {petInfo.petAge || 'Unknown'}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mt: 2, bgcolor: 'cream', color: 'primary' }}>
            <Typography variant="h5" gutterBottom>
              Your Location
            </Typography>
            <div style={{ height: '300px' }}>
              {location ? (
                <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={location}>
                    <Popup>
                      You are here.
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <Typography>Loading map...</Typography>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: 'cream', color: 'primary' }}>
            <MedicalServicesIcon sx={{ fontSize: 40, mb: 1, color: 'tertiary.main' }} />
            <Typography variant="h5" gutterBottom>
              Vaccination Timeline
            </Typography>
            <Timeline sx={{ flexDirection: 'row', overflowX: 'auto' }}>
              {vaccinations.map((vaccination) => (
                <TimelineItem key={vaccination.id}>
                  <TimelineOppositeContent color="textSecondary">
                    {vaccination.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} sx={{ p: 2 }}>
                      <Typography variant="h6" component="h1">
                        {vaccination.summary}
                      </Typography>
                      <Typography>{`Vet: ${vaccination.vetName}`}</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mt: 2, bgcolor: 'cream', color: 'primary' }}>
            <CalendarTodayIcon sx={{ fontSize: 40, mb: 1, color: 'tertiary.main' }} />
            <Typography variant="h5" gutterBottom>
              Appointment Calendar
            </Typography>
            <Calendar
              localizer={localizer}
              events={appointments.map(appointment => ({
                title: `Vet: ${appointment.vetName}`,
                start: new Date(`${appointment.date}T${appointment.time}`),
                end: new Date(`${appointment.date}T${appointment.time}`)
              }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </Paper>
        </Grid>
      </Grid>
      {nextAppointment && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            Your next appointment is on {nextAppointment.date} at {nextAppointment.time} with {nextAppointment.vetName}.
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default UserDashboard;
