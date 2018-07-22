var admin = require('firebase-admin');
var serviceAccount = require('json/peernus-96580-firebase-adminsdk.json');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post("/createToken", function(req, res) {
  var uid = req.body.nusnet;
  admin.auth().createCustomToken(uid)
    .then(function(customToken) {
      // Send token back to client
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ token : customToken }));
    })
    .catch(function(error) {
      console.log("Error creating custom token:", error);
    });

});

app.listen(process.env.PORT || 5000);
