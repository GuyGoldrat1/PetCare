import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Toolbar,
  Avatar,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {
  getDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const VetDashboard = () => {
  const { currentUser } = useAuth();
  const [vetInfo, setVetInfo] = useState({});
  const [nextAppointment, setNextAppointment] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchVetInfo = async () => {
      if (currentUser) {
        const vetDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (vetDoc.exists()) {
          setVetInfo(vetDoc.data());
        }
      }
    };

    const fetchAppointments = async () => {
      if (currentUser) {
        const q = query(
          collection(db, "availableAppointments"),
          where("vetId", "==", currentUser.uid),
          where("booked", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter and sort appointments that are in the future
        const upcoming = appointments.filter(
          (app) => new Date(`${app.date}T${app.time}`) > new Date()
        );
        upcoming.sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        );
        const updatedUpcoming = await Promise.all(
          upcoming.map(async (app) => {
            let clientEmail = "Unknown"; // Default value
            if (app.clientId) {
              // Fetch corresponding client document from "users" collection
              const clientDoc = await getDoc(doc(db, "users", app.clientId));
              if (clientDoc.exists()) {
                clientEmail = clientDoc.data().email; // Get the email from client doc
              }
            }
            return {
              ...app,
              clientEmail, // Add the clientEmail to the appointment object
              status: clientEmail, // Any other computed field
            };
          })
        );

        // Set next appointment and all upcoming appointments
        setNextAppointment(updatedUpcoming[0]);
        setUpcomingAppointments(updatedUpcoming);

        const events = upcoming.map((app) => ({
          title: `Client: ${app.clientId}`,
          start: new Date(`${app.date}T${app.time}`),
          end: new Date(`${app.date}T${app.time}`),
        }));
        setEvents(events);
      }
    };

    fetchVetInfo();
    fetchAppointments();
  }, [currentUser]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "primary", fontWeight: "bold" }}
          >
            VET DASHBOARD
          </Typography>
        </Toolbar>
        <Container>
          <Grid container spacing={3}>
            {/* Vet info */}
            <Grid item md={6}>
              <Paper
                sx={{
                  height: 150,
                  padding: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={vetInfo.vetImageUrl || ""}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <div>
                  <Typography variant="h6" gutterBottom>
                    Vet Info
                  </Typography>
                  <Typography>
                    <strong>Name:</strong> {vetInfo.name || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Location:</strong> {vetInfo.location || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {vetInfo.phone || "N/A"}
                  </Typography>
                </div>
              </Paper>
            </Grid>
            {/* Next Appointment */}
            <Grid item md={6}>
              <Paper
                sx={{
                  height: 150,
                  padding: 3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ScheduleIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <div>
                  <Typography variant="h6" gutterBottom>
                    Next Appointment
                  </Typography>
                  {nextAppointment ? (
                    <Paper sx={{ bgcolor: "primary.main", p: 2 }}>
                      <Typography>
                        {nextAppointment.date}, Time:{" "}
                        {nextAppointment.time}, Client: {nextAppointment.clientEmail}
                      </Typography>
                    </Paper>
                  ) : (
                    <Typography>No upcoming appointments</Typography>
                  )}
                </div>
              </Paper>
            </Grid>
            {/* Appointments List (Scrollable) */}
            <Grid item md={6}>
              <Paper sx={{ height: 400, padding: 2, overflowY: "auto" }}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Appointments
                </Typography>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <Paper
                      key={appointment.id}
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        bgcolor: "primary.main",
                      }}
                    >
                      <Typography>Client: {appointment.clientEmail}</Typography>
                      <Typography>
                        {appointment.date}, Time: {appointment.time}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography>No upcoming appointments</Typography>
                )}
              </Paper>
            </Grid>
            {/* Calendar */}
            <Grid item md={6}>
              <Paper>
                <Box sx={{ mt: 3, padding: 3 }}>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 250 }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default VetDashboard;
