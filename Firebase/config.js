// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVtkqR6_HWJlACcx65K0mAeJERjK63P0c",
  authDomain: "codesgalaxy-4e2a5.firebaseapp.com",
  projectId: "codesgalaxy-4e2a5",
  storageBucket: "codesgalaxy-4e2a5.appspot.com",
  messagingSenderId: "632294220760",
  appId: "1:632294220760:web:ee016d45cdd74c1e4d08ad",
  measurementId: "G-YSQEN7EWC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);