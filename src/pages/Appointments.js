import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAuth } from "../context/AuthContext";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ChooseDoctor from "../components/ChooseDoctor"; // Import your new DataGrid component

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { currentUser } = useAuth();
  const [vets, setVets] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Filtered appointments based on selected vet
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [selectedVet, setSelectedVet] = useState(null); // Track selected vet
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [appointmentToBook, setAppointmentToBook] = useState(null); // State for the appointment to book

  useEffect(() => {
    const fetchVets = async () => {
      const q = query(collection(db, "users"), where("role", "==", "vet"));
      const querySnapshot = await getDocs(q);
      const vetsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVets(vetsList);
    };

    const fetchAvailableAppointments = async () => {
      try {
        const q = query(
          collection(db, "availableAppointments"),
          where("booked", "==", false)
        );
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter appointments that are in the future (ignore past appointments)
        const futureAppointments = appointments.filter((appointment) => {
          const appointmentDate = new Date(
            `${appointment.date}T${appointment.time}`
          );
          return appointmentDate >= new Date(); // Check if the appointment date is in the future
        });

        setAvailableAppointments(futureAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAvailableAppointments();
    fetchVets();
  }, []);

  // Filter appointments based on selected vet
  useEffect(() => {
    if (selectedVet) {
      const filtered = availableAppointments.filter(
        (appointment) => appointment.vetId === selectedVet.id
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments([]);
    }
  }, [selectedVet, availableAppointments]);

  // Handle booking confirmation dialog
  const handleOpenDialog = () => {
    if (!selectedAppointment) {
      alert("Please select an appointment");
      return;
    }
    const appointmentToBook = availableAppointments.find(
      (appointment) => appointment.id === selectedAppointment
    );
    if (appointmentToBook) {
      setAppointmentToBook(appointmentToBook);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentToBook(null);
  };

  const handleConfirmBooking = async () => {
    if (appointmentToBook) {
      const appointmentRef = doc(
        db,
        "availableAppointments",
        appointmentToBook.id
      );

      // Add to the 'appointments' collection
      await addDoc(collection(db, "appointments"), {
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

      setAvailableAppointments(
        availableAppointments.filter(
          (appointment) => appointment.id !== appointmentToBook.id
        )
      );
      handleCloseDialog();
    }
  };

  // Handle selecting a vet
  const HandleClick = (vet) => {
    setSelectedVet(vet); // Set the selected vet
  };

  // Map events for the calendar
  const events = filteredAppointments.map((appointment) => ({
    title: `${appointment.vetName} at: ${appointment.time}`,
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
          <Paper sx={{ ml: 4, padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              Book Appointment
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Available Appointments</InputLabel>
              <Select
                value={selectedAppointment}
                onChange={(e) => setSelectedAppointment(e.target.value)}
              >
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <MenuItem key={appointment.id} value={appointment.id}>
                      {` ${appointment.date} Time: ${appointment.time}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">
                    No available appointments for selected doctor
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
              sx={{ mt: 2 }}
            >
              Book Appointment
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ mr: 4, padding: 3 }}>
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

      {/* Dialog for booking confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to book this appointment with{" "}
            {appointmentToBook?.vetName} on {appointmentToBook?.date} at{" "}
            {appointmentToBook?.time}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking} color="primary" autoFocus>
            Yes, Book
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default Appointments;
