/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const {initializeApp} = require("firebase-admin/app");
const {getFirestore, GeoPoint} = require("firebase-admin/firestore");

initializeApp();

exports.addvet = onRequest(async (req, res) => {
    const vetName = req.query.name;
    const writeResult = await getFirestore().collection("vets").add({
        name: vetName,
        image: 'https://via.placeholder.com/150',
        position: new GeoPoint(32.072929, 34.776306)
    });
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
