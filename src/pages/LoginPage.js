// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
        // if (currentUser.role === 'vet') {
        //   navigate('/vet-dashboard');
        // } else if (currentUser.role === 'pet-owner') {
        //   navigate('/user-dashboard');
        // }
        navigate('/');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }

  };

  const handleReturnToLogin = () => {
    navigate('/');
  };

  return (
    // <div style={styles.container}>
    //   <h2 style={styles.header}>Login</h2>
    //   {error && <p style={styles.error}>{error}</p>}
    //   <form onSubmit={handleLogin} style={styles.form}>
    //     <div style={styles.inputGroup}>
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //         style={styles.input}
    //       />
    //     </div>
    //     <div style={styles.inputGroup}>
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         style={styles.input}
    //       />
    //     </div>
    //     <button type="submit" style={styles.button}>
    //       Login
    //     </button>
    //   </form>
    // </div>
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign In with password
          </Typography>
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
