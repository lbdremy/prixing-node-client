#A [Prixing](http://www.prixing.fr/) API Client library
[![](https://secure.travis-ci.org/lbdremy/prixing-node-client.png)](http://travis-ci.org/#!/lbdremy/prixing-node-client)

##Install

`npm install prixing-client`

##Usage

<pre>
   <code>
      // Dependencies
      var prixing = require('prixing-client');

      // Create a Client
      var apikey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx' // Put your own apikey
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
            
   </code>
</pre>

##Test

In the wild:
`npm test`

##Licence

(The MIT Licence)
Copyright 2012-2013 Rémy Loubradou

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
