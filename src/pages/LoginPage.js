// LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import PetCareLogo from "../assets/petcare-logo.png"; // Make sure to import your logo
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'; // Import ArrowBackIcon


const GoogleButton = styled(Button)({
  backgroundColor: "#4285F4 !important", // Add !important
  color: "white !important", // Add !important
  "&:hover": {
    backgroundColor: "#357ae8 !important", // Add !important
  },
  "& .MuiButton-startIcon": {
    marginRight: "10px",
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, googlelogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // if (currentUser.role === 'vet') {
      //   navigate('/vet-dashboard');
      // } else if (currentUser.role === 'pet-owner') {
      //   navigate('/user-dashboard');
      // }
      navigate("/");
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  const handleReturnToLogin = () => {
    navigate("/");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mb: 2,width:100,height:40 }}
          onClick={handleReturnToLogin}
        >
          Return
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Sign In</Typography>
          {error && <p style={styles.error}>{error}</p>}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: "16px" }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Divider>or</Divider>
            <Button
              variant="outlined"
              startIcon={
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google logo"
                />
              }
              onClick={googlelogin} // Call googlelogin when clicked
              fullWidth
              sx={{
                mt: 2,
                mb: "20px",
                color: "black",
                borderColor: "primary.main",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default LoginPage;
