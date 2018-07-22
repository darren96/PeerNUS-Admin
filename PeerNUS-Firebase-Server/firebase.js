var admin = require('firebase-admin');

var serviceAccount = require('json/peernus-96580-firebase-adminsdk.json');

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://peernus-96580.firebaseio.com',
  serviceAccountId: "firebase-adminsdk-xk4yu@peernus-96580.iam.gserviceaccount.com"
});

var uid = "some-uid";

admin.auth().createCustomToken(uid)
  .then(function(customToken) {
    // Send token back to client
  })
  .catch(function(error) {
    console.log("Error creating custom token:", error);
  });

// Initialize the default app
//var defaultApp = admin.initializeApp(defaultAppConfig);

console.log(defaultApp.name);

// ... or use the equivalent shorthand notation
var defaultAuth = admin.auth();
var defaultDatabase = admin.database();
