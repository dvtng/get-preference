import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";

export function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Get Preference</h1>
        </header>
        <Switch>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
