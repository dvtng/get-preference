import { useEffect, FC, ReactElement, useState } from "react";
import { useDb } from "../db/DbContext";
import { useCurrentUser, CurrentUser } from "../models/CurrentUser";
import { Db } from "../db/Db";

export type SetupProps = {
  children: (
    db: Db,
    currentUser: CurrentUser
  ) => Promise<ReactElement> | ReactElement;
};

/**
 * Perform setup operations before rendering a story.
 */
export const Setup: FC<SetupProps> = ({ children: childrenFn }) => {
  const db = useDb("remote");
  const currentUser = useCurrentUser();
  const [element, setElement] = useState<ReactElement | null>(null);
  useEffect(() => {
    const result = childrenFn(db, currentUser);
    if (result instanceof Promise) {
      result.then(setElement);
    } else {
      setElement(result);
    }
  }, [childrenFn, db, currentUser]);

  return element;
};
