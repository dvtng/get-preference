import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { NeedsName } from "./features/NeedsName";
import { PollScreen } from "./screens/PollScreen";

export function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Get Preference</h1>
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <NeedsName>
                <HomeScreen />
              </NeedsName>
            </Route>
            <Route path="/poll/:pollId" exact>
              {({ match }) => (
                <NeedsName>
                  <PollScreen pollId={match.params.pollId} />
                </NeedsName>
              )}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
