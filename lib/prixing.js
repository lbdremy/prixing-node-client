/**
 * Modules dependencies
 */
 
var http = require('http');

// Expose Client Factory
exports.createClient = function(apikey){
   return new Client(apikey);
}
       
// Client Class
function Client(apikey){
   this.apikey = apikey;
   this.host = 'v1.prixing.fr';
   this.path = '/api/v1';
}

// Get a product by its EAN
Client.prototype.getProduct = function(ean,callback){
   var options = {
      host : this.host,
      port : 80,
      path : this.path + '/ean/' + ean + '?key=' + this.apikey,
      headers : {
         'Content-Type' : 'application/json',
         'Accept-Charset' : 'utf-8'
      }
   };
   
   http.get(options, function(res) {
      var body = '';
      if(res.statusCode != 200){
         var err = new Error('HTTP Status ' +  res.statusCode);
         callback(err,null)
      }else{
         res.setEncoding('utf8');
         res.on('data', function (chunk) {
            body += chunk;
         });
         res.on('end',function(){
            try{
               var data = JSON.parse(body);
               if(data.code && data.code != 200){
                  var err = new Error('Code ' + data.code + '. Message: ' + data.erreur);
                  callback(err,null);
               }else{
                  callback(null,data);
               }
            }catch(err){
               callback(err,null);
            }
         });
      }
   }).on('error', function(err) {
      callback(err,null);
   });
} 