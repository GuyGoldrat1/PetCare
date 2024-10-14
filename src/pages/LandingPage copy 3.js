import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Box, Typography, Container, Paper, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import PetCareLogo from "../assets/petcare-logo.png"; // Make sure to import your logo
import VetImage from "../assets/vet-image.png"; // Replace with your vet image path
import DogImage from "../assets/dog-image.png"; // Replace with your dog image path
import ArrowForward from "@mui/icons-material/ArrowForward";
import TwoSidedLayout from "../components/TwoSidedLayout.tsx";



const LandingPage = () => {

  useEffect(() => {
  }, []);

  return (
      <TwoSidedLayout>
        <Typography color="primary" sx={{ fontSize: "lg", fontWeight: "lg" }}>
          The power to do more
        </Typography>
        <Typography
          level="h1"
          sx={{
            fontWeight: "xl",
            fontSize: "clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)",
          }}
        >
          A large headlinerer about our product features & services
        </Typography>
        <Typography
          textColor="text.secondary"
          sx={{ fontSize: "lg", lineHeight: "lg" }}
        >
          A descriptive secondary text placeholder. Use it to explain your
          business offer better.
        </Typography>
        <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
          Get Started
        </Button>
        <Typography>
          Already a member? <Link sx={{ fontWeight: "lg" }}>Sign in</Link>
        </Typography>
      </TwoSidedLayout>
  );
};

export default LandingPage;
