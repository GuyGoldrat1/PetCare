import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material';

const questions = [
  "What are your operating hours?",
  "How can I make an appointment?",
  "What services do you offer?",
  "Where are you located?",
  "Do you offer emergency services?",
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    setMessages([...messages, { text: question, user: true }, { text: getAnswer(question), user: false }]);
    setSelectedQuestion(null);
  };

  const getAnswer = (question) => {
    switch (question) {
      case "What are your operating hours?":
        return "We are open from 8am to 8pm, Monday to Saturday.";
      case "How can I make an appointment?":
        return "You can make an appointment by visiting our 'Appointments' page or calling us directly.";
      case "What services do you offer?":
        return "We offer a variety of services including vaccinations, general check-ups, emergency care, and more.";
      case "Where are you located?":
        return "We are located at 123 PetCare Street, PetCity.";
      case "Do you offer emergency services?":
        return "Yes, we offer 24/7 emergency services. Please call our emergency number for immediate assistance.";
      default:
        return "I'm sorry, I don't have an answer for that question.";
    }
  };

  return (
    <Container sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)', minHeight: '100vh', pt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: '24px', mb: 4 }}>
        Chat with PetCareBot
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleQuestionClick(question)}
            sx={{ m: 1, fontSize: '16px' }}
          >
            {question}
          </Button>
        ))}
      </Box>
      <Paper sx={{ p: 3, borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: message.user ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <ChatBubbleOutlineIcon sx={{ color: message.user ? '#1976d2' : '#757575' }} />
            <Box
              sx={{
                ml: message.user ? 0 : 2,
                mr: message.user ? 2 : 0,
                p: 2,
                borderRadius: '12px',
                backgroundColor: message.user ? '#1976d2' : '#e0e0e0',
                color: message.user ? '#ffffff' : '#000000',
                maxWidth: '75%',
              }}
            >
              {message.text}
            </Box>
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default Chat;
