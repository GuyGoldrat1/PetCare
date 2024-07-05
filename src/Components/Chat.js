import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Button, IconButton } from '@mui/material';
import { ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material';
import ArrowBackImage from '/Users/admin/learning-react/src/assets/arrow (1).png'; 

const initialQuestions = [
  "What are your operating hours?",
  "How can I make an appointment?",
  "What services do you offer?",
  "Where are you located?",
  "Do you offer emergency services?",
];

const leadingQuestions = {
  "What are your operating hours?": [
    "Are you open on holidays?",
    "What are your weekend hours?"
  ],
  "How can I make an appointment?": [
    "Can I book an appointment online?",
    "Do I need to create an account to book an appointment?"
  ],
  "What services do you offer?": [
    "Do you offer grooming services?",
    "Can you provide more details on vaccinations?"
  ],
  "Where are you located?": [
    "Is there parking available?",
    "How can I reach you via public transport?"
  ],
  "Do you offer emergency services?": [
    "What should I do in an emergency?",
    "Can I walk in for emergency services?"
  ],
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState(initialQuestions);
  const [showBackButton, setShowBackButton] = useState(false);

  const handleQuestionClick = (question) => {
    let newMessages = [
      ...messages,
      { text: question, user: true },
      { text: getAnswer(question), user: false }
    ];

    if (question === "None of these answers helped me, give me to talk with service representative") {
      newMessages = [
        ...messages,
        { text: question, user: true },
        { text: "Please call our Service Representative at (123) 456-7890 for further assistance.", user: false }
      ];
      setMessages(newMessages);
      setCurrentQuestions([]);
      setShowBackButton(true);
    } else if (question === "Back to initial questions") {
      setMessages(newMessages);
      setCurrentQuestions(initialQuestions);
      setShowBackButton(false);
    } else if (leadingQuestions[question]) {
      setMessages(newMessages);
      setCurrentQuestions([...leadingQuestions[question]]);
      setShowBackButton(true);
    } else {
      setMessages(newMessages);
      setCurrentQuestions(["None of these answers helped me, give me to talk with service representative"]);
      setShowBackButton(true);
    }
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
      <Paper sx={{ p: 3, borderRadius: '8px', backgroundColor: '#f9f9f9', mb: 2 }}>
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
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
          {currentQuestions.map((question, index) => (
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
        {showBackButton && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <IconButton
              onClick={() => handleQuestionClick("Back to initial questions")}
              sx={{
                width: 56,
                height: 56,
                '&:hover': {
                  backgroundColor: '#ff7961'
                },
              }}
            >
              <img src={ArrowBackImage} alt="Back to initial questions" style={{ width: '100%', height: '100%' }} />
            </IconButton>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Chat;
