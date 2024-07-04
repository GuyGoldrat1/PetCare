const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

// Create a new express application instance
const app = express();

// Middleware
app.use(bodyParser.json());

// Your credentials file path
const CREDENTIALS = JSON.parse(require('./path/to/your/credentials.json'));

// Your project ID
const PROJECT_ID = CREDENTIALS.project_id;

// Create a new session
const sessionClient = new dialogflow.SessionsClient({
  credentials: CREDENTIALS
});

// Detect intent method
async function detectIntent(queryText, sessionId) {
  const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
}

// Routes
app.post('/dialogflow', async (req, res) => {
  const { queryText } = req.body;
  const sessionId = uuid.v4();

  const response = await detectIntent(queryText, sessionId);
  res.send(response);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
