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
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

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
const auth = getAuth(app);

// UI Elements
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let userId = null; // will be set when signed in

// --- AUTHENTICATION (Anonymous) ---
signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch((error) => console.error("Auth error:", error));

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    console.log("User signed in:", user.uid);
  }
});

// --- SEND MESSAGE ---
sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (text && userId) {
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
    p.textContent = msg.text;
    p.style.padding = "6px";
    p.style.borderRadius = "6px";
    p.style.margin = "4px 0";

    if (msg.senderId === userId) {
      p.style.backgroundColor = "#dcf8c6";
      p.style.textAlign = "right";
    } else {
      p.style.backgroundColor = "#f1f0f0";
      p.style.textAlign = "left";
    }

    messagesDiv.appendChild(p);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    user.displayName = "User " + user.uid.slice(-4); // show last 4 chars
  }
});

p.textContent = `${msg.senderId.slice(-4)}: ${msg.text}`;
