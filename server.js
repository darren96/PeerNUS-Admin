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

  var userEmail = uid + "@u.nus.edu";
  admin.auth().updateUser(uid, {
    email: userEmail
  }).then(function(userRecord) {
    console.log("Successfully updated.");
  }).catch(function(error) {
    console.log("Error occured");
  })

});

app.post("/sendMessage", function(req, res) {
  var message = req.body;

  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
})

app.listen(process.env.PORT || 5000);
