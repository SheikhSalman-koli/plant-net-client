// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:"AIzaSyBsQHJgHVX-VCgqR2-Nxb8CEAJqw1Z4qnc",
    authDomain:"explore-email-password-50586.firebaseapp.com",
    projectId:"explore-email-password-50586",
    storageBucket:"explore-email-password-50586.firebasestorage.app",
    messagingSenderId:"1037310864102",
    appId:"1:1037310864102:web:c4743ce2e426ce09026927",
    
    // apiKey:import.meta.env.VITE_apiKey,
    // authDomain:import.meta.env.VITE_authDomain,
    // projectId:import.meta.env.VITE_projectId,
    // storageBucket:import.meta.env.VITE_storageBucket,
    // messagingSenderId:import.meta.env.VITE_messagingSenderId,
    // appId:import.meta.env.VITE_appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
