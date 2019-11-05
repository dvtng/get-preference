import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { initFirebase, getFirebaseDb } from "./firebase";
import { DbContext } from "./api/DbContext";
import { BrowserRouter } from "react-router-dom";

initFirebase();

ReactDOM.render(
  <DbContext.Provider value={getFirebaseDb()}>
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
