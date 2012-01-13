/**
 * Modules dependencies
 */

var vows = require('vows'),
    assert = require('assert'),
    prixing = require('./../main');


// Test Suite Prixing
var suite = vows.describe('Prixing API v1 client library');

var apikey = '4cef92e2efc64f6984c935f61dc032a3';        
var ean = '3017624044003' //NUTELLA stuff

suite.addBatch({
   'Create a client' : {
      topic : function(){
         var client = prixing.createClient(apikey);
         return client;
      },
      'should be OK' : assertClient
   },
   'Look for a product' : {
      topic : function(){
         var client = prixing.createClient(apikey);
         return client;
      },
      'using an EAN' : {
         topic : function(client){
            client.getProduct(ean,this.callback)         
         },
         'should return data about this product' : function(err,data){
            assert.isNull(err);
            assert.isObject(data);
         }
      },
      'using an invalid EAN' : {
         topic : function(client){
            client.getProduct('66666',this.callback)
         },
         'should return an error' : assertPrixingError
      },
      'using an unknown EAN' : {
         topic : function(client){
            client.getProduct('0000000000001',this.callback);
         },
         'should return an error' : assertPrixingError
      },
      'using an invalid key' : {
         topic : function(client){
            client.apikey = 'invalidapikey';
            client.getProduct(ean,this.callback);
         },
         'should return an error' : assertPrixingError
      }
   }
}).export(module);

// Macros
function assertClient(o){
   assert.isString(o.apikey);
   assert.isString(o.host);
   assert.isFunction(o.getProduct);
}

function assertPrixingError(err,data){
   assert.instanceOf(err,Error);
   assert.isNull(data);
}
