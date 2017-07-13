const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
  // Initialize Firebase
const config = {
  apiKey: 'AIzaSyC2I1-zEED6G4PyzJyiNXgBpsNr3oQ78Vk',
  authDomain: 'weather-routes.firebaseapp.com',
  databaseURL: 'https://weather-routes.firebaseio.com',
  projectId: 'weather-routes',
  storageBucket: 'weather-routes.appspot.com',
  messagingSenderId: '622068010787'
}
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
