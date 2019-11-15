import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { initFirebase } from "./firebase";
import { DbContext } from "./db/DbContext";
import { BrowserRouter } from "react-router-dom";
import { getFirestoreDb } from "./db/FirestoreDb";
import { MemoryDb } from "./db/MemoryDb";
import { CurrentUser } from "./models/CurrentUser";

const memoryDb = new MemoryDb();

initFirebase(new CurrentUser(memoryDb));

ReactDOM.render(
  <DbContext.Provider value={{ memory: memoryDb, remote: getFirestoreDb() }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DbContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
