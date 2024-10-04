import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, TextField } from '@mui/material';

const DoctorList = ({ vets, HandleClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVets = vets.filter((vet) =>
    vet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ p: 3}}>
      <Typography variant="h4" gutterBottom>
        Our Veterinarians
      </Typography>
      <TextField
        label="Search by Doctor's Name"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
      />
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, py: 2 ,padding:2 }}>
        {filteredVets.map((vet) => (
          <Card
            key={vet.id}
            sx={{
              minWidth: 300,
              cursor: 'pointer',
              transition: 'transform 0.3s, background-color 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#f5f5f5',
              },
            }}
            onClick={() => HandleClick(vet)}
          >
            <CardContent>
              <Avatar src={vet.vetImageUrl || ''} sx={{ width: 150, height: 150, mx: 'auto' }} />
              <Typography variant="h5" align="center">
                {vet.name}
              </Typography>
              <Typography variant="body1" align="center">
                {vet.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DoctorList;
