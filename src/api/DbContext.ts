import { createContext, useContext } from "react";
import { MockDb } from "./MockDb";
import { Db } from "./Db";

export const DbContext = createContext<Db>(new MockDb());

export const useDb = () => {
  return useContext(DbContext);
};
