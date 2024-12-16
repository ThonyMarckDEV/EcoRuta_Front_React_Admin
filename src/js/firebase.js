// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {

    apiKey: "AIzaSyBswwBi1i9b9sgE5A5jgoozy6fTVkGeMRI",
  
    authDomain: "reciperu-9ab32.firebaseapp.com",
  
    databaseURL: "https://reciperu-9ab32-default-rtdb.firebaseio.com",
  
    projectId: "reciperu-9ab32",
  
    storageBucket: "reciperu-9ab32.appspot.com",
  
    messagingSenderId: "790248094002",
  
    appId: "1:790248094002:web:48d2bdb4c956527a813f2b",
  
    measurementId: "G-P44FJMD2JW"
  
};
  

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };  // Exportamos auth para usarlo en otras partes
