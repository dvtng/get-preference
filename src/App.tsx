import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  match as Match
} from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { NameScreen } from "./screens/NameScreen";
import { PollScreen } from "./screens/PollScreen";

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <NameScreen>
            <HomeScreen />
          </NameScreen>
        </Route>
        <Route path="/poll/:pollId" exact>
          {({ match }) => (
            <NameScreen>
              <PollScreen pollId={(match as Match<any>).params.pollId} />
            </NameScreen>
          )}
        </Route>
      </Switch>
    </Router>
  );
}
