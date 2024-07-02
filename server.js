const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    let responseText = '';

    switch (intentName) {
        case 'BookAppointment':
            const date = req.body.queryResult.parameters.date;
            const time = req.body.queryResult.parameters.time;
            responseText = `You have booked an appointment on ${date} at ${time}.`;
            break;
        case 'AskVetLocation':
            responseText = 'The nearest vet clinic is located at 123 Pet Street.';
            break;
        case 'GeneralFAQ':
            responseText = 'We provide a range of services including vaccinations, dental care, and surgery.';
            break;
        default:
            responseText = 'I am not sure how to help with that.';
            break;
    }

    res.json({
        fulfillmentText: responseText
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
