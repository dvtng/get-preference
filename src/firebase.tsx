import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1CghyyshAys5-zkUW7y6Nq17jSFeBIFc",
  authDomain: "getpreference.firebaseapp.com",
  databaseURL: "https://getpreference.firebaseio.com",
  projectId: "getpreference",
  storageBucket: "getpreference.appspot.com",
  messagingSenderId: "217407872093",
  appId: "1:217407872093:web:a027b6bc6c38717a5341b4",
  measurementId: "G-3Z7GMD8W6X"
};

export const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};
