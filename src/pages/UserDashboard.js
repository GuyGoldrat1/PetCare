import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAuth } from '../context/AuthContext';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
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
import AppointmentsDataGrid from '../components/AppointmentsDataGrid'; // Import your new DataGrid component



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
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Track if the dialog is open
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); // Track the appointment to delete

  useEffect(() => {
    const fetchPetInfo = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setPetInfo(userDoc.data());
        } else {
          console.error("No such document!");
        }
      }
    };

    const fetchAvailableAppointments = async () => {
      const today = new Date().toISOString().split("T")[0];
      console.error("today", today);
      try {
        const q = query(
          collection(db, "availableAppointments"),
          where("clientId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (appointments.length > 0) {
          const sortedAppointments = appointments.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          const futureAppointments = sortedAppointments.filter(
            (appointment) => {
              const appointmentDate = new Date(
                `${appointment.date}T${appointment.time}`
              );
              return appointmentDate >= new Date(); // Check if the appointment date is in the future
            }
          );
          setAvailableAppointments(futureAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchMedicalRecords = async () => {
      if (currentUser) {
        try {
          const q = query(
            collection(db, "medicalRecords"),
            where("clientId", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const recordsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMedicalRecords(recordsList);
        } catch (error) {
          console.error("Error fetching medical records:", error);
        }
      }
    };

    const fetchVaccinations = async () => {
      if (currentUser) {
        const q = query(
          collection(db, "medicalRecords"),
          where("clientId", "==", currentUser.uid),
          where("treatmentType", "==", "Vaccination")
        );
        const querySnapshot = await getDocs(q);
        const vaccinationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVaccinations(vaccinationsList);
      }
    };


    fetchPetInfo();
    fetchAvailableAppointments();
    fetchMedicalRecords();
    fetchVaccinations();
  }, [currentUser]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      // Optionally, mark the appointment as available again (if required)
      await updateDoc(doc(db, "availableAppointments", selectedAppointmentId), {
        clientId: null, // Mark it as available by setting clientId to null
        booked: false,
      });

      // Fetch updated appointments after deletion
      const updatedAppointments = availableAppointments.filter(
        (appointment) => appointment.id !== selectedAppointmentId
      );
      setAvailableAppointments(updatedAppointments);
      setDialogOpen(false); // Close the dialog after deleting
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const openDeleteDialog = (id) => {
    setSelectedAppointmentId(id);
    setDialogOpen(true); // Open confirmation dialog
  };

  const closeDeleteDialog = () => {
    setDialogOpen(false);
  };

  const events = availableAppointments.map((appointment) => ({
    title: `${appointment.vetName} 
    at: ${appointment.time}`,
    start: new Date(`${appointment.date}T${appointment.time}`),
    end: new Date(`${appointment.date}T${appointment.time}`),
    id: appointment.id,
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3">DASHBOARD</Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "black", fontWeight: "bold" }}
      >
        Welcome to your Dashboard!
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              height: 250,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <PetsIcon sx={{ fontSize: 40, mb: 2, color: "tertiary.main" }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ ml: 2, fontWeight: "bold" }}
              >
                Pet Info
              </Typography>
            </Box>
            <Typography variant="body1">
              <strong>Age:</strong> {petInfo.petAge || "Unknown"}
            </Typography>
            <Typography variant="body1">
              <strong>Birth Date:</strong> {petInfo.petBirthDate || "Unknown"}
            </Typography>
            <Typography variant="body1">
              <strong>Breed:</strong> {petInfo.petBreed || "Unknown"}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {petInfo.petGender || "Unknown"}
            </Typography>
            <Typography variant="body1">
              <strong>Weight:</strong> {petInfo.petWeight || "Unknown"}
            </Typography>
            <Typography variant="body1">
              <strong>Color:</strong> {petInfo.petColor || "Unknown"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 250 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Upcoming Events
            </Typography>

            <Paper sx={{ overflowY: "auto", p: 2, mt: 2 }}>
              <AppointmentsDataGrid
                availableAppointments={availableAppointments}
                handleDelete={openDeleteDialog}
              />
            </Paper>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <MedicalServicesIcon
                sx={{ fontSize: 40, mb: 1, color: "tertiary.main" }}
              />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ ml: 2, fontWeight: "bold" }}
              >
                Medical History
              </Typography>
            </Box>
            <Carousel>
              {medicalRecords.map((record) => (
                <Paper
                  key={record.id}
                  elevation={2}
                  sx={{
                    p: 2,
                    margin: "0 10px",
                    bgcolor: "cream",
                    color: "primary",
                  }}
                >
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
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <MedicalServicesIcon
                sx={{ fontSize: 40, mb: 1, color: "tertiary.main" }}
              />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ ml: 2, fontWeight: "bold" }}
              >
                Vaccination Timeline
              </Typography>
            </Box>
            <Timeline sx={{ flexDirection: "row", overflowX: "auto" }}>
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
        </Grid>
      </Grid>
      {nextAppointment && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            Your next appointment is on {nextAppointment.date} at{" "}
            {nextAppointment.time} with {nextAppointment.vetName}.
          </Alert>
        </Snackbar>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={dialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Appointment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this appointment? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDashboard;
