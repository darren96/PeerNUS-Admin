var admin = require('firebase-admin');
var serviceAccount = require('json/peernus-96580-firebase-adminsdk.json');
var express = require('express');
var app = express();

app.post("/createToken", function(req, res) {
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  var uid = req.params.nusnet;
  admin.auth().createCustomToken(uid)
    .then(function(customToken) {
      // Send token back to client
      res.send(customToken);
      console.log(customToken);
    })
    .catch(function(error) {
      console.log("Error creating custom token:", error);
    });

});

app.listen(80, () => console.log('PeerNUS app listening on port 80!'));
