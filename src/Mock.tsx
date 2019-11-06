import React, { FC } from "react";
import { MockDb } from "./db/MockDb";
import { MemoryRouter } from "react-router-dom";
import { DbContext } from "./db/DbContext";

export const Mock: FC = ({ children }) => (
  <DbContext.Provider value={{ local: new MockDb(), remote: new MockDb() }}>
    <MemoryRouter>{children}</MemoryRouter>
  </DbContext.Provider>
);
