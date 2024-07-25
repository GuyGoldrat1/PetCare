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

const ADMIN = 0;
const PET_OWNER = 1;
const VET = 2;

initializeApp();

exports.addVaccination = onCall(async (request) => {
    // Checking that the user is authenticated.
    if (!request.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new HttpsError("failed-precondition", "The function must be " +
                "called while authenticated.");
    }
    const db = getFirestore();
    const vaccine = request.data;
    const writeResult = await db.collection("vaccinations").add(vaccine);
    logger.info("new vaccination added.");
    return {
        id: writeResult.id
    };
});
exports.addPetOwner = onCall(async (request) => {
    const userData = request.data.user;
    const petOwnerData = request.data.petOwner;
    const db = getFirestore();
    // TODO: check if user already exists
    const petOwnerRef = await db.collection("petOwners").add(petOwnerData);
    logger.info("new pet owner added.");
    const userRef = await db.collection("users")
        .add({
            username: userData.username,
            password: userData.password,
            type: PET_OWNER,
            docRef: petOwnerRef
        });
    logger.info("new user added.");
    return {
        userID: userRef.id,
        petOwnerID: petOwnerRef.id
    };
});

exports.addVet = onCall(async (request) => {
    const userData = request.data.user;
    const vetData = request.data.vet;
    const db = getFirestore();
    // TODO: check if user already exists
    const vetRef = await db.collection("vets").add(vetData);
    logger.info("new pet owner added.");
    const userRef = await db.collection("users")
        .add({
            username: userData.username,
            password: userData.password,
            type: VET,
            docRef: vetRef
        });
    logger.info("new user added.");
    return {
        userID: userRef.id,
        petOwnerID: vetRef.id
    };
});

exports.loginPetOwner = onCall(async (request) => {
    const username = request.data.username;
    const password = request.data.password;
    const db = getFirestore();
    const result = await db.collection("users")
        .where("username", "=", username)
        .where("password", "=", password)
        .get();
    if (result.empty) {
        return {
            isSuccess: false,
            petOwnerData: null
        };
    }
    const userData = result.docs[0].data();
    if (!userData.docRef) {
        return {
            isSuccess: false,
            petOwnerData: null
        };
    }
    const petOwner = await userData.docRef.get();
    return {
        isSuccess: true,
        petOwnerData: petOwner.data()
    };
});

