// src/pages/About.js
import React from 'react';
import { Typography, Card, CardContent, Grid, Avatar, Container, Paper } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const About = () => {
  const founders = [
    { name: 'Elad Kadosh', photo: 'images/elad.jpg', role: 'Co-Founder' },
    { name: 'Noy Agam', photo: 'images/noy.jpeg', role: 'Co-Founder' },
    { name: 'Guy Goldrat', photo: 'images/guy.jpeg', role: 'Co-Founder' },
    { name: 'Sagi Haklay', photo: 'images/sagi.jpeg', role: 'Co-Founder' }
  ];

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        About PetCare
      </Typography>
      <Paper sx={{ mb: 5, p: 3 }}>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center">
          <PetsIcon sx={{ mr: 1 }} /> Our Mission
        </Typography>
        <Typography paragraph>
          PetCare is dedicated to providing the best possible care for your pets by connecting you with trusted veterinarians. 
          Our platform allows you to easily manage your pet's medical history, book appointments, and access vital information 
          about your pet's health and wellbeing.
        </Typography>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center">
          <PetsIcon sx={{ mr: 1 }} /> Our Team
        </Typography>
        <Typography paragraph>
          We are a team of passionate pet lovers and technology enthusiasts who believe in the power of innovation to improve pet care. 
          Our veterinarians are experienced professionals committed to delivering high-quality care and advice.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom align="center">
        Our Founders
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {founders.map((founder, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <Avatar 
                  src={founder.photo} 
                  alt={founder.name} 
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }} 
                />
                <Typography variant="h6">{founder.name}</Typography>
                <Typography color="textSecondary">{founder.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 5, p: 3 }}>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center">
          <PetsIcon sx={{ mr: 1 }} /> Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions or feedback, feel free to reach out to us at contact@petcare.com. 
          We are here to help you and your pets have a healthier and happier life.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
