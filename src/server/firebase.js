// // import { initializeApp } from "firebase/app";
// // import { getFirestore } from "firebase/firestore";
// // import { getAuth } from "firebase/auth";
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCsmi_RIkUifMhxW6673vySz9-w268tekY",
// //   authDomain: "slack-react-clone-68ab6.firebaseapp.com",
// //   projectId: "slack-react-clone-68ab6",
// //   storageBucket: "slack-react-clone-68ab6.appspot.com",
// //   messagingSenderId: "729110853608",
// //   appId: "1:729110853608:web:02bf3b8814fbca569b165d",
// //   measurementId: "G-E6HW48642Y",
// // };
// // firebase.initializeApp(firebaseConfig);
// // firebase.analytics();
// // export default firebase;
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCsmi_RIkUifMhxW6673vySz9-w268tekY",
//   authDomain: "slack-react-clone-68ab6.firebaseapp.com",
//   projectId: "slack-react-clone-68ab6",
//   storageBucket: "slack-react-clone-68ab6.appspot.com",
//   messagingSenderId: "729110853608",
//   appId: "1:729110853608:web:02bf3b8814fbca569b165d",
//   measurementId: "G-E6HW48642Y",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// // Initialize Auth
// const auth = getAuth(app);

// // Initialize Analytics (optional, include only if you need it)
// const analytics = getAnalytics(app);

// export { app, db, auth, analytics };
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

export { firebase, auth, db, analytics };
