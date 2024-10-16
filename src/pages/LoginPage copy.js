// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from "@mui/system";

const GoogleButton = styled(Button)({
  backgroundColor: "#4285F4",
  color: "white",
  "&:hover": {
    backgroundColor: "#357ae8",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In with password
          </Typography>
          {error && <p style={styles.error}>{error}</p>}
          <GoogleButton
            variant="contained"
            startIcon={
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google logo"
              />
            }
            onClick={googlelogin} // Call googlelogin when clicked
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            Sign in with Google
          </GoogleButton>
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
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleReturnToLogin}
            >
              Return to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};


const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default LoginPage;
