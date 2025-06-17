
// src/lib/firebase/config.ts
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// IMPORTANT: 
// 1. Replace the placeholder values below with your actual Firebase project configuration.
// You can find this in your Firebase project settings:
// Project settings > General > Your apps > SDK setup and configuration (select Config).
// 2. Ensure you have enabled Google Sign-In as an authentication provider
// in your Firebase project: Firebase Console > Authentication > Sign-in method > Add Google.
// 3. Add your application's domain (and localhost for testing) to the authorized domains list
// in Firebase Console > Authentication > Settings > Authorized domains.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", // Replace with your actual API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your actual auth domain
  projectId: "YOUR_PROJECT_ID_HERE", // Replace with your actual project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your actual storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE", // Replace with your actual sender ID
  appId: "YOUR_APP_ID_HERE", // Replace with your actual app ID
  measurementId: "YOUR_MEASUREMENT_ID_HERE" // Optional: Replace if you use Analytics
};

let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully.");
  } catch (e) {
    console.error("Error initializing Firebase app. Have you replaced the placeholder config values in src/lib/firebase/config.ts?", e);
    // Prevent further errors if initialization fails
    // @ts-ignore - app might not be initialized
    app = undefined; 
  }
} else {
  app = getApps()[0];
}

// @ts-ignore - app might be undefined if initialization failed
if (app) {
  auth = getAuth(app);
} else {
  // Fallback auth object to prevent further errors, app won't work.
  // @ts-ignore - app is undefined
  auth = {} as Auth; 
  console.error("Firebase app is not initialized, Auth functionalities will not work. Please check your Firebase config and ensure it's correctly placed in src/lib/firebase/config.ts and you have enabled Google Sign-In provider in your Firebase project console.");
}


export { app, auth };
