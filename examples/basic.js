// Dependencies
var prixing = require('./../main');

// Create a Client
var apikey = 'xxxxxx' // Put your own apikey
var client = prixing.createClient(apikey);

// Get a product using its EAN (bar code)
var ean = '3017624044003' //NUTELLA stuff
client.getProduct(ean,function(err,data){
   if(err){
      console.log('ERROR: ' + err);
   }else{
      console.log('INFOS: ' + JSON.stringify(data));
   }
});

//Done!
