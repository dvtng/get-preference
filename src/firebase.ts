import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { CurrentUser } from "./models/CurrentUser";

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

export const initFirebase = (currentUser: CurrentUser) => {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser.signIn({
        id: user.uid,
        name: user.displayName || "[Unknown]"
      });
    } else {
      currentUser.signOut();
    }
  });
};

export const signIn = (): Promise<void> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      if (!result.user) {
        throw new Error("No user after sign-in");
      }
    });
};
