const firebase = require('firebase');
const { 
    getFirebaseAPIKey, 
    getFirebaseAppId, 
    getFirebaseAuthDomain,
    getFirebaseProjectId,
    getFirebaseStorageBucket, 
    getFirebaseMessagingSenderId } = require('../util/config.util');
require('./colors');

const firebaseConfigObject = {
    apiKey: getFirebaseAPIKey(),
    authDomain: getFirebaseAuthDomain(),
    projectId: getFirebaseProjectId(),
    storageBucket: getFirebaseStorageBucket(),
    messagingSenderId: getFirebaseMessagingSenderId(),
    appId: getFirebaseAppId()
};

export const firebaseApp = firebase.initializeApp(firebaseConfigObject);

// For debugging
console.log(`Initialized Firebase!!`.help);
// const infoApp = firebase.apps[0];
// console.log(`Firebase initialized - ${JSON.stringify(infoApp.options, null, 2)}`.help);
