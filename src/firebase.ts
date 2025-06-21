import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your new web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyIbO_lvDzOg4VstrfO2qdMNKYdZ1fiPM",
  authDomain: "onit-b6e3a.firebaseapp.com",
  projectId: "onit-b6e3a",
  storageBucket: "onit-b6e3a.firebasestorage.app",
  messagingSenderId: "601284603958",
  appId: "1:601284603958:web:26052e4be7d064c255e897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
export const db = getFirestore(app);

// Get a reference to the Auth service
export const auth = getAuth(app);

/*
// Use a Vite-specific environment variable to connect to emulators in dev mode
if (import.meta.env.DEV) {
  console.log("DEV environment detected. Connecting to local emulators.");

  // Point to the emulators
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  
  // Optional: This workaround can help in some environments.
  // @ts-ignore
  db._settings = {
    ...db._settings,
    experimentalForceLongPolling: true,
  };
}
*/