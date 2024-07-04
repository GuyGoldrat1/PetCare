import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "PetCareBot";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. How can I help you today?`)],
};

export default config;
