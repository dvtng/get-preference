import { createContext, useContext } from "react";
import { Db } from "./Db";

export const DbContext = createContext<{ [key: string]: Db }>({});

export const useDb = (key: string): Db => {
  const db = useContext(DbContext)[key];

  if (!db) {
    throw new Error(`No DB with key ${key}`);
  }

  return db;
};
