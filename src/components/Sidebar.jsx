import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  LocalHospital,
  Event,
  Help,
  Info,
  MedicalServices,
  Vaccines,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Sidebar = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  const [petInfo, setPetInfo] = useState({});

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
    fetchPetInfo();
  }, [currentUser]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250, // Fixed width for the sidebar
          height: "100vh", // Full viewport height
          position: "fixed", // Keep it fixed
          background: "linear-gradient(#045292, #63b6e3)", // Gradient background
        }}
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h1" sx={{ mt: 3 }}>
            PetCare
          </Typography>
          <Avatar
            src={
              role === "pet-owner"
                ? petInfo.petImageUrl || "default-pet-image.jpg"
                : petInfo.vetImageUrl || "default-vet-image.jpg"
            }
            alt={role === "pet-owner" ? "Pet" : "Vet"}
            sx={{ width: 150, height: 150, mb: 0, mt: 2, mx: "auto" }}
          />
        </Box>

        {/* Sidebar menu */}
        <List sx={{ color: "background.paper", ml: 3 }}>
          {role === "pet-owner" ? (
            <>
              <ListItem button component={Link} to="/user-dashboard">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/medical-history">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <MedicalServices />
                </ListItemIcon>
                <ListItemText primary="Medical History" />
              </ListItem>
              <ListItem button component={Link} to="/vaccinations">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <Vaccines />
                </ListItemIcon>
                <ListItemText primary="Vaccinations" />
              </ListItem>
              <ListItem button component={Link} to="/doctors">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText sx={{ fontWeight: "bold" }} primary="Doctors" />
              </ListItem>
              <ListItem button component={Link} to="/appointments">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="New Appointment" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/vet-dashboard">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/vet-appointments">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
              </ListItem>
              <ListItem button component={Link} to="/vet-patients">
                <ListItemIcon sx={{ color: "background.paper" }}>
                  <LocalHospital />
                </ListItemIcon>
                <ListItemText primary="Patients" />
              </ListItem>
            </>
          )}
          <ListItem button component={Link} to="/faq">
            <ListItemIcon sx={{ color: "background.paper" }}>
              <Help />
            </ListItemIcon>
            <ListItemText primary="FAQ Page" />
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemIcon sx={{ color: "background.paper" }}>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Box>

      {/* Content area - push content right */}
      <Box sx={{ marginLeft: "250px", width: "100%" }}>
        {/* Your page content goes here */}
      </Box>
    </Box>
  );
};

export default Sidebar;
