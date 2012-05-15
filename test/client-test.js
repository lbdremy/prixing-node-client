/**
 * Modules dependencies
 */

var nock = require('nock'),
    prixing = require('./../main'),
    fs = require('fs'),
    vows = require('vows'),
    assert = require('assert');
   
// API key
var config =  JSON.parse(
               fs.readFileSync(__dirname + '/config.json')
              );
var apikey = config.apikey;
var mocked = config.mocked;

if(mocked){
   // Mock of the Prixing API
   //nock.recorder.rec();

   nock('http://v1.prixing.fr')
     .get('/api/v1/ean/0000000000001?key=' + apikey)
     .reply(200, "{ \"code\":415, \"erreur\":\"EAN invalide\" }\n", { date: 'Wed, 18 Jan 2012 09:37:35 GMT',
     server: 'Apache/2.2.16 (Debian)',
     vary: 'Accept-Encoding',
     'content-type': 'text/html',
     connection: 'close',
     'transfer-encoding': 'chunked' })
     .get('/api/v1/ean/3017624044003?key=invalidapikey')
     .reply(200, "{ \"code\":401, \"erreur\":\"Clé API invalide\" }\n", { date: 'Wed, 18 Jan 2012 09:37:35 GMT',
     server: 'Apache/2.2.16 (Debian)',
     vary: 'Accept-Encoding',
     'content-type': 'text/html',
     connection: 'close',
     'transfer-encoding': 'chunked' })
     .get('/api/v1/ean/66666?key=' + apikey)
     .reply(200, "{ \"code\":415, \"erreur\":\"EAN invalide\" }\n", { date: 'Wed, 18 Jan 2012 09:37:35 GMT',
     server: 'Apache/2.2.16 (Debian)',
     vary: 'Accept-Encoding',
     'content-type': 'text/html',
     connection: 'close',
     'transfer-encoding': 'chunked' })
     .get('/api/v1/ean/3017624044003?key=' + apikey)
     .reply(200, "{\"produit\":{\"marque\":[\"NUTELLA\"],\"price_count\":100,\"proprietes\":{\"Informations nutritionnelles\":\"Données nutritionnelles : 100g contiennent environ 31.00g de LIPIDES,56.4g de GLUCIDES,6.40g de PROTIDES.Valeur énergétique pour 100g 530 Kcal\",\"Notre avis\":\"Le pot de 400g est pratique pour les consommateurs occasionnels. Cette marque a vraiment ses amateurs et bien souvent ce ne sont pas les plus jeunes enfants. Nous apprécions toujours autant cette pâte à tartiner. Vous pouvez aussi l'employer de multiples façons : avec des crêpes, dans un gâteau, sur du pain\",\"Donnees nutritionnelles (100g/ml)\":\"Valeur énergétique.2215 kJ / 530 kcal.Protéines.6.8 g.Glucides.56 g.Lipides.31 g.Fibres.4 g.Sodium.0.03 g\",\"Ingredients\":\"Sucre, huile végétale, noisettes (13%), cacao maigre (7,4%), lait écrémé en poudre (6,6%), lactosérum en poudre, émulsifiant (lécithine de soja), arôme Sans colorant ni conservateur.\",\"Valeur energetique\":\"Pour 100g : 530 kcal (2215 kJ), protéïnes : 6,8g, glucides : 56g, lipides : 31g.\",\"Renseignements pratiques\":\"Nutella est à base d'ingrédients naturels et justement dosés. Petit déjeuner Nutella équilibré : 2 tartines de pain et de Nutella, 1 bol de lait et 1 verre de jus d'orange. Goûter Nutella équilibré : 1 tartine de pain et de Nutella, 1 yaourt nature.\",\"Informations\":\"Sur du pain au petit-déjeuner et au goûter ou sur des crêpes pendant la chandeleur, Nutella accompagne toute la famille pour des moments de plaisir ! Produit mythique à la recette inégalée, Nutella accompagne les petits déjeuners et goûters de millions de français depuis 1965. Preuve de l'attachement des familles à la marque, la France est devenue le premier marché mondial pour Nutella avec plus de 100 millions de pots consommés en 2008. Une des marques phares du Groupe Ferrero et la marque alimentaire préférée des français.\",\"Allergenes\":\"Contient : Fruits à coque (amandes, noisettes, noix de cajou, pistaches), Lait de vache, Soja\",\"Composition\":\"Sucre, huile végétale, noisettes (13%), cacao maigre (7.4%), lait écrémé en poudre (6.6%), lactosérum en poudre, émulsifiant (lécithine de soja), arôme.\"},\"price\":\"2.19\",\"titre\":[\"PATE A TARTINER NUTELLA 400G\",\"Pâte à tartiner\",\"Pâte à tartiner aux noisettes\",\"Nutella Pâte à tartiner 400g\",\"Pâte à tartiner aux noisettes, lait écrémé\",\"Pâte à tartiner Nutella, 400g\"],\"image\":{\"width\":\"350\",\"url\":\"http://www.prixing.fr/img/p/22/3017624044003_L.jpg\",\"height\":\"350\"}},\"code\":200}\n", { date: 'Wed, 18 Jan 2012 09:37:35 GMT',
     server: 'Apache/2.2.16 (Debian)',
     vary: 'Accept-Encoding',
     'content-type': 'text/html',
     connection: 'close',
     'transfer-encoding': 'chunked' });

}
  
// Test Suite Prixing
var suite = vows.describe('Prixing API v1 client library');

       
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
