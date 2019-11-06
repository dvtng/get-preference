import * as firebase from "firebase/app";
import { Db } from "./Db";

export const getFirestoreDb = (): Db => firebase.firestore();
