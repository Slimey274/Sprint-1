// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";

// Your Firebase config
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
const db = getFirestore(app);

// Elements
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Fake user ID (replace with Firebase Auth later)
const userId = "user_" + Math.floor(Math.random() * 1000);

// --- SEND MESSAGE ---
sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (text) {
    await addDoc(collection(db, "messages"), {
      text: text,
      senderId: userId,
      timestamp: serverTimestamp()
    });
    input.value = "";
  }
});

// --- LISTEN FOR MESSAGES ---
const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.forEach((doc) => {
    const msg = doc.data();
    const p = document.createElement("p");
    p.textContent = `${msg.senderId}: ${msg.text}`;
    messagesDiv.appendChild(p);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
