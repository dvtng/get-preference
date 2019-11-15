import React, { FC } from "react";
import { MemoryDb } from "./db/MemoryDb";
import { MemoryRouter } from "react-router-dom";
import { DbContext } from "./db/DbContext";

export const Mock: FC = ({ children }) => (
  <DbContext.Provider
    value={{ memory: new MemoryDb(), remote: new MemoryDb() }}
  >
    <MemoryRouter>{children}</MemoryRouter>
  </DbContext.Provider>
);
