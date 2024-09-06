// src/pages/FAQ.js
import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Container, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PetsIcon from '@mui/icons-material/Pets';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const faqData = [
  {
    question: 'How do I book an appointment with a vet?',
    answer: 'To book an appointment with a vet, go to the "Appointments" section, select an available slot, and confirm your booking.',
    icon: <LocalHospitalIcon />
  },
  {
    question: 'Can I view my pet\'s medical history?',
    answer: 'Yes, you can view your pet\'s medical history in the "Medical Bag" section. All past medical records are stored there for your reference.',
    icon: <VaccinesIcon />
  },
  {
    question: 'How do I add a new pet to my profile?',
    answer: 'To add a new pet, navigate to the "Dashboard" and click on "Add Pet". Fill in the necessary details and save.',
    icon: <PetsIcon />
  },
  {
    question: 'Can I reschedule or cancel an appointment?',
    answer: 'Yes, you can reschedule or cancel an appointment from the "Appointments" section. Select the appointment and choose the desired action.',
    icon: <CalendarTodayIcon />
  },
  {
    question: 'How do I contact a vet in case of an emergency?',
    answer: 'In case of an emergency, go to the "Emergency Contact" section where you can find the contact details of available vets for immediate assistance.',
    icon: <LocalHospitalIcon />
  },
  {
    question: 'Is my pet\'s data secure on PetCare?',
    answer: 'Yes, PetCare ensures that all your pet\'s data is securely stored and only accessible to you and the authorized veterinarians.',
    icon: <VaccinesIcon />
  }
];

const FAQ = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: '2rem' }}>
        Frequently Asked Questions
      </Typography>
      <Paper sx={{ p: 3 }}>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {faq.icon}
              <Typography sx={{ ml: 1, fontSize: '1.2rem' }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontSize: '1rem' }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default FAQ;
