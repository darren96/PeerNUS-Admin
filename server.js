var admin = require('firebase-admin');
var serviceAccount = require('json/peernus-96580-firebase-adminsdk.json');
var express = require('express');
var bodyParser = require('body-parser');
var mime = require('mime-types');
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
      console.log(customToken);

      //res.body.token = customToken;
      let messageData = { token : customToken };
      res.send(messageData);
    })
    .catch(function(error) {
      console.log("Error creating custom token:", error);
    });

});

app.listen(process.env.PORT || 5000);
