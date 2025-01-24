// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDdJzo6aUJm56LGkCc7z5BVQlUsiZopGpk",
  // authDomain: "edutrack-6d4aa.firebaseapp.com",
  // projectId: "edutrack-6d4aa",
  // storageBucket: "edutrack-6d4aa.firebasestorage.app",
  // messagingSenderId: "457914424538",
  // appId: "1:457914424538:web:226b3e494d5260171f19e3"
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env. VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app;