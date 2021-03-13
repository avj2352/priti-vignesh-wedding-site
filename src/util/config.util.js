/**
 * PAJ - Helper functions to load all environment variables from this place
 * Easier to configure env variables on HEROKU / AWS - Refer this file
 * Dependency on config library and envrionment variables OR
 * development.json or default.json
 */
const config = require('config');
const serverConfig = config.get('server');
 
 // MAIN ==============================================
 
 export function getPORT () {
     return process.env.PORT || serverConfig.port;
 }