import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar, Box } from '@mui/material';
import eladImage from '/Users/admin/learning-react/src/assests/elad.jpeg';
import noyImage from '/Users/admin/learning-react/src/assests/noy.jpeg';
import guyImage from '/Users/admin/learning-react/src/assests/guy.jpeg';
import sagiImage from '/Users/admin/learning-react/src/assests/sagi.jpeg';

const founders = [
  { name: 'Elad Kadosh', image: eladImage },
  { name: 'Noy Agam', image: noyImage },
  { name: 'Guy Goldrat', image: guyImage },
  { name: 'Sagi Haklay', image: sagiImage }
];

const About = () => {
  return (
    <Container sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)', minHeight: '100vh', pt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: '40px', mb: 4 }}>
        About Us
      </Typography>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Our Vision
        </Typography>
        <Typography paragraph sx={{ fontSize: '20px' }}>
          At PetCare, we are dedicated to ensuring the well-being of your pets through our comprehensive web application.
          Our platform provides a variety of features to help you manage your pet's health and activities. From tracking medical history and immunization records to booking vet appointments and accessing 24/7 emergency chat support, we aim to cover all aspects of pet care.
        </Typography>
        <Typography paragraph sx={{ fontSize: '20px' }}>
          Our mission is to create a seamless and efficient experience for pet owners, making it easier to take care of their furry friends. We believe that by providing the right tools and resources, we can help improve the quality of life for both pets and their owners. Join us on our journey to revolutionize pet care, one paw at a time.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {founders.map((founder, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={founder.image}
                  alt={founder.name}
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6">{founder.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
