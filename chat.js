// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVbdiZKgguWUUOnlZxEPhsWRq9ntLnnP4",
  authDomain: "my-chat-system-ceba7.firebaseapp.com",
  projectId: "my-chat-system-ceba7",
  storageBucket: "my-chat-system-ceba7.firebasestorage.app",
  messagingSenderId: "292874385319",
  appId: "1:292874385319:web:a89d2fc6fe39496c65e882",
  measurementId: "G-XP5BXN5X96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);