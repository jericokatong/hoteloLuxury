const firebaseConfig = {
  apiKey: "AIzaSyDUprYpMWXmgm0in4RUckLISJ5HVx8Y20o",
  authDomain: "hotel-luxury-d362c.firebaseapp.com",
  projectId: "hotel-luxury-d362c",
  storageBucket: "hotel-luxury-d362c.appspot.com",
  messagingSenderId: "550837195791",
  appId: "1:550837195791:web:ce40360d3d1d050de8bf7a",
  measurementId: "G-8191NL6FEW",
};

const admin = require("firebase-admin");
const serviceAccount = require("../hotel-luxury-d362c-firebase-adminsdk-4wuq1-a5069d621c.json");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

// const admin = require("firebase-admin");
// const serviceAccount = require("../../hotel-luxury-d362c-firebase-adminsdk-4wuq1-a5069d621c.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

initializeApp(firebaseConfig);

module.exports = { firebaseConfig, admin, serviceAccount, initializeApp, getStorage, ref, getDownloadURL, uploadBytesResumable, admin, serviceAccount };
