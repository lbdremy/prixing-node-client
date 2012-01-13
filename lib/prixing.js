/**
 * Modules dependencies
 */

var Client = require('./client/');

// Expose Client Factory
exports.createClient = function(apikey){
   return new Client(apikey);
}
