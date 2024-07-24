/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.addVaccination = onCall(async (request) => {
    // Checking that the user is authenticated.
    if (!request.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new HttpsError("failed-precondition", "The function must be " +
                "called while authenticated.");
    }
    const vaccine = request.data;
    const writeResult = await getFirestore()
        .collection("vaccinations")
        .add(vaccine);
    logger.info("new vaccination added.");
    return {
        id: writeResult.id
    };
});
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
