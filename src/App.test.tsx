import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Mock } from "./Mock";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Mock>
      <App />
    </Mock>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
