import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const VetAppointments = () => {
  const { currentUser } = useAuth();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vetLocation, setVetLocation] = useState("");
  const [vetName, setVetName] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  useEffect(() => {
    if (!currentUser) return; // Wait for the user to be authenticated

    const fetchVetDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setVetLocation(userData.location || "");
          setVetName(userData.name || "");
        }
      } catch (error) {
        console.error("Error fetching vet details:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, "availableAppointments"),
          where("vetId", "==", currentUser.uid),
          where("booked", "==", false)
        );
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((app) => new Date(`${app.date}T${app.time}`) > new Date()) // Remove past slots
          .sort(
            (a, b) =>
              new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
          ); // Sort by nearest date

        const appointmentEvents = appointments.map((app) => ({
          title: "Availability",
          start: new Date(`${app.date}T${app.time}`),
          end: new Date(`${app.date}T${app.time}`),
          id: app.id,
          date: app.date,
          time: app.time,
        }));

        setEvents(appointmentEvents);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchVetDetails();
    fetchAppointments();
  }, [currentUser]);

  const handleAddAvailableAppointment = async () => {
    const selectedDateTime = new Date(`${date}T${time}`);

    if (date && time && vetLocation && vetName) {
      // Prevent booking in the past
      if (selectedDateTime < new Date()) {
        alert("You can't book a slot in the past!");
        return;
      }

      // Check for conflicting slots
      const conflictQuery = query(
        collection(db, "availableAppointments"),
        where("vetId", "==", currentUser.uid),
        where("date", "==", date),
        where("time", "==", time)
      );
      const conflictingAppointments = await getDocs(conflictQuery);
      if (!conflictingAppointments.empty) {
        alert("There is already an available slot at this time!");
        return;
      }

      const ref = await addDoc(collection(db, "availableAppointments"), {
        vetId: currentUser.uid,
        vetName: vetName,
        vetLocation: vetLocation,
        date: date,
        time: time,
        booked: false,
      });
      alert("Available appointment slot added successfully");
      setEvents(
        events.concat([
          {
            title: "Availability",
            start: new Date(`${date}T${time}`),
            end: new Date(`${date}T${time}`),
            id: ref.id,
            date: date,
            time: time,
          },
        ])
      );
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const appointmentRef = doc(db, "availableAppointments", appointmentId);
      await deleteDoc(appointmentRef);
      alert("Availability deleted successfully");
      setEvents(events.filter((event) => event.id !== appointmentId));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <Box className="appointments-container">
      <Grid container spacing={3} sx={{ ml: 2 }}>
        <Grid item xs={12} md={6}>
          <Card className="appointments-card">
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Add Available Appointment Slots
              </Typography>

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
                onClick={handleAddAvailableAppointment}
                sx={{ mt: 2 }}
              >
                Add Appointment Slot
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ overflowY: "auto", p: 2, height: 400 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Open Slots
            </Typography>

            <Box sx={{ height: 150 }}>
              {events.length > 0 ? (
                events.map((appointment) => (
                  <Paper
                    key={appointment.id}
                    elevation={3}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      mb: 2,
                      bgcolor: "primary.main",
                    }}
                  >
                    <Box>
                      <Typography variant="body1">
                        {appointment.date}
                      </Typography>
                      <Typography variant="body1">
                        {appointment.time}
                      </Typography>
                    </Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Paper>
                ))
              ) : (
                <Typography variant="body1">
                  No upcoming appointments
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={(event) => setSelectedAppointment(event)}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default VetAppointments;
