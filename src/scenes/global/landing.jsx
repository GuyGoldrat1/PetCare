import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from '../../assets/DogFunny.jpg'; // Path to your image

export default function LandingPage({setIsVet}) {
  const navigate = useNavigate();

  const handleClientLogin = () => {
    setIsVet(false);
    navigate('/home');
  };

  const handleVetLogin = () => {
    setIsVet(true);
    navigate('/home');
  };


  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <Container
      component="main"
      sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#d2eafa', 
    height: '100vh',
    justifyContent: 'center',
    padding: 2,
    width: '50%', // Adjust the width as needed
    maxWidth: '100px', // Set a maximum width
      }}
    >
      <Typography color="primary" variant="h6" fontWeight="fontWeightBold">
        The power to do more
      </Typography>
      <Box
        component="img"
        src={Image}
        alt="PetCare"
        sx={{ mt: 4, width: '300px' }}
      />
  
      <Typography
        variant="h2"
        fontWeight="fontWeightBold"
        sx={{ fontSize: { xs: '1.875rem', sm: '2.5rem', md: '3rem' }, mt: 2 }}
      >
        A large headline about our product features & services
      </Typography>
      <Typography variant="h6" color="black" sx={{ mt: 2 }}>
        A descriptive secondary text placeholder. Use it to explain your business offer better.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          onClick={handleClientLogin}
        >
          Client login
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          onClick={handleVetLogin}
        >
          Vet Login
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Already a member? <Link component="button" onClick={handleSignIn}>Sign in</Link>
      </Typography>
    </Container>
  );
}
