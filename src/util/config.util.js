/**
 * PAJ - Helper functions to load all environment variables from this place
 * Easier to configure env variables on HEROKU / AWS - Refer this file
 * Dependency on config library and envrionment variables OR
 * development.json or default.json
 */
const config = require('config');
const serverConfig = config.get('server');
const firebaseConfg = config.get('firebase');
 
// MAIN ==============================================
export function getPORT () {
     return process.env.PORT || serverConfig.port;
}

// FIREBASE RELATED =================================
export function getFirebaseAppId() {
    return process.env.firebaseAppId || firebaseConfg.appId;
}

export function getFirebaseAPIKey() {
    return process.env.firebaseAPIKey || firebaseConfg.apiKey;
}

export function getFirebaseAuthDomain() {
    return process.env.firebaseAuthDomain || firebaseConfg.authDomain;
}

export function getFirebaseDatabaseURL() {
    return process.env.firebaseDatabaseURL || firebaseConfg.databaseURL;
}

export function getFirebaseProjectId() {
    return process.env.firebaseProjectId || firebaseConfg.projectId;
}

export function getFirebaseStorageBucket() {
    return process.env.firebaseStorageBucket || firebaseConfg.storageBucket;
}

export function getFirebaseMessagingSenderId() {
    return process.env.firebaseMessagingSenderId || firebaseConfg.messagingSenderId;
}

