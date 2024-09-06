// src/pages/SignUpPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import PetCareLogo from '../assets/petcare-logo.png'; // Make sure to import your logo

const SignUpPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleFromQuery = queryParams.get('role');
    if (roleFromQuery) {
      setRole(roleFromQuery);
    }
  }, [location.search]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBirthDate, setPetBirthDate] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petColor, setPetColor] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [vetImage, setVetImage] = useState(null);
  const [name, setName] = useState('');
  const [locationField, setLocationField] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp({ role, email, password, petName, petAge, petBirthDate, petBreed, petGender, petWeight, petColor, petImage, vetImage, name, location: locationField, phone });
      alert('Sign-up complete');
      navigate('/');
    } catch (error) {
      alert('Error during sign-up. Please try again.');
    }
  };

  const handleReturnToLogin = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={PetCareLogo} alt="PetCare Logo" style={{ width: '150px', marginBottom: '20px' }} />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="pet-owner">Pet Owner</MenuItem>
                <MenuItem value="vet">Vet</MenuItem>
              </Select>
            </FormControl>
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
            {role === 'pet-owner' && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="petName"
                  label="Pet Name"
                  name="petName"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="petAge"
                  label="Pet Age"
                  name="petAge"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="petBirthDate"
                  label="Pet Birth Date"
                  name="petBirthDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={petBirthDate}
                  onChange={(e) => setPetBirthDate(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="petBreed"
                  label="Pet Breed"
                  name="petBreed"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Pet Gender</InputLabel>
                  <Select
                    value={petGender}
                    onChange={(e) => setPetGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="petWeight"
                  label="Pet Weight"
                  name="petWeight"
                  value={petWeight}
                  onChange={(e) => setPetWeight(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="petColor"
                  label="Pet Color"
                  name="petColor"
                  value={petColor}
                  onChange={(e) => setPetColor(e.target.value)}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Upload Pet Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setPetImage(e.target.files[0])}
                  />
                </Button>
              </>
            )}
            {role === 'vet' && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  value={locationField}
                  onChange={(e) => setLocationField(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Upload Vet Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setVetImage(e.target.files[0])}
                  />
                </Button>
              </>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignUp}
            >
              Sign Up
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

export default SignUpPage;
