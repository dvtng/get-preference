import React from "react";
import { App } from "../App";
import { Setup } from "./Setup";

export default {
  title: "App"
};

export const app = () => (
  <Setup>
    {(db, currentUser) => {
      currentUser.signOut();
      return <App />;
    }}
  </Setup>
);
