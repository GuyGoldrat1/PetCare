import React from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const AppointmentsList = ({ availableAppointments, handleDelete }) => {
  return (
    <Box sx={{ height: 300, p: 2}}>
      <Typography variant="h3" gutterBottom>
        Upcoming Events
      </Typography>

      {availableAppointments.length > 0 ? (
        availableAppointments.map((appointment) => (
          <Paper
            key={appointment.id}
                sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              mb: 2,
                    bgcolor: 'green.main',
                
            }}
          >
                <Box >
                <Typography variant="h4">
                {appointment.vetName}
              </Typography>

              <Typography variant="body1">
                 {appointment.date}
              </Typography>
              <Typography variant="body1">
                 {appointment.time}
              </Typography>
            </Box>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(appointment.id)} // Calls the delete handler
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No upcoming appointments</Typography>
      )}
    </Box>
  );
};

export default AppointmentsList;
