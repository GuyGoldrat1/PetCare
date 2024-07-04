import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import medicalBagIcon from '/Users/admin/learning-react/src/assests/medbag.png'; 
import immunizationHistoryIcon from '/Users/admin/learning-react/src/assests/vaccine.png';
import medicalHistoryIcon from '/Users/admin/learning-react/src/assests/vetclinic.png';

const immunizationHistory = [
  { age: "1 year", vaccines: ["Rabies", "Bordatella"], date: "2012" },
  { age: "2 years", vaccines: ["DHPP", "Lepto"], date: "2013" },
  { age: "3 years", vaccines: ["Lyme", "Influenza"], date: "2014" },
  { age: "4 years", vaccines: ["Rabies"], date: "2015" },
  { age: "5 years", vaccines: ["DHPP"], date: "2016" },
  { age: "6 years", vaccines: ["Lyme"], date: "2017" },
  { age: "7 years", vaccines: ["Bordatella"], date: "2018" },
  { age: "8 years", vaccines: ["Lepto"], date: "2019" },
  { age: "9 years", vaccines: ["Influenza"], date: "2020" },
  { age: "10 years", vaccines: ["Rabies"], date: "2021" },
  { age: "11 years", vaccines: ["DHPP"], date: "2022" },
  { age: "12 years", vaccines: ["Lyme"], date: "2023" },
  { age: "13 years", vaccines: ["Bordatella"], date: "2024" },
];

const medicalHistory = [
  { date: "11/01/2023", description: "Does not want to eat", veterinarian: "John Smith", diagnosis: "Teeth Problems", tests: "General", results: "Done", action: "Monitor and provide water", medication: "NA", comments: "NA" },
  { date: "01/04/2021", description: "Heartworm preventative", veterinarian: "John Smith", diagnosis: "Heartworm preventative", tests: "Heartworm preventative", results: "Done", action: "NA", medication: "NA", comments: "NA" },
  { date: "05/03/2020", description: "Flea and Tick Treatment", veterinarian: "John Smith", diagnosis: "Flea and Tick Treatment", tests: "Flea and Tick Treatment", results: "Done", action: "NA", medication: "NA", comments: "NA" },
  { date: "07/04/2019", description: "Heartworm preventative", veterinarian: "John Smith", diagnosis: "Heartworm preventative", tests: "Heartworm preventative", results: "Done", action: "NA", medication: "NA", comments: "NA" },
  { date: "03/08/2016", description: "Fecal/Deworming", veterinarian: "John Smith", diagnosis: "Fecal/Deworming", tests: "Fecal/Deworming", results: "Done", action: "NA", medication: "NA", comments: "NA" },
];

const MedicalBag = () => {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)', minHeight: '100vh', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar src={medicalBagIcon} alt="Medical Bag Icon" sx={{ mr: 2, width: 80, height: 80, mt: -3 }} />
        <Typography variant="h3" gutterBottom>
          Medical Bag
        </Typography>
      </Box>
      <Box mb={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={immunizationHistoryIcon} alt="Immunization History Icon" sx={{ mr: 2, width: 80, height: 80 }} />
              <Typography variant="h5" component="div">
                Immunization History
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', overflowX: 'auto', mt: 2 }}>
              <Timeline
                position="right"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  '& .MuiTimelineItem-root:before': {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                {immunizationHistory.map((record, index) => (
                  <TimelineItem key={index} sx={{ flex: '1 0 auto', minWidth: '150px' }}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {index < immunizationHistory.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6">{record.age}</Typography>
                      <Typography>{record.vaccines.join(", ")}</Typography>
                      <Typography variant="body2" color="textSecondary">{record.date}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={medicalHistoryIcon} alt="Medical History Icon" sx={{ mr: 2, width: 80, height: 80, mt: -1 }} />
                <Typography variant="h5" component="div">
                  Medical History
                </Typography>
              </Box>
              {medicalHistory.map((record, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{record.date} - {record.description}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Veterinarian: {record.veterinarian}</Typography>
                    <Typography>Diagnosis: {record.diagnosis}</Typography>
                    <Typography>Tests: {record.tests}</Typography>
                    <Typography>Results: {record.results}</Typography>
                    <Typography>Action: {record.action}</Typography>
                    <Typography>Medication: {record.medication}</Typography>
                    <Typography>Comments: {record.comments}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MedicalBag;
