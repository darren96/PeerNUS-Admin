var admin = require('firebase-admin');
var express = require('express');
var app = express();
var serviceAccount = require('json/peernus-96580-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post("/createToken", function(req, res) {
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
