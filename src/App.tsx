import React from "react";
import { Switch, Route, match as Match } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { PollScreen } from "./screens/PollScreen";

export const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <AuthScreen>
          <HomeScreen />
        </AuthScreen>
      </Route>
      <Route path="/poll/:pollId" exact>
        {({ match }) => (
          <AuthScreen>
            <PollScreen pollId={(match as Match<any>).params.pollId} />
          </AuthScreen>
        )}
      </Route>
    </Switch>
  );
};
