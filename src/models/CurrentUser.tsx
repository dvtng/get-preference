import nanoid from "nanoid";
import { createContext, useContext } from "react";
import { action, decorate, observable } from "mobx";

const CURRENT_USER_ID_KEY = "app.currentUserId";
const CURRENT_USER_NAME_KEY = "app.currentUserName";

export class CurrentUser {
  id: string;
  name: string = localStorage.getItem(CURRENT_USER_NAME_KEY) || "";

  constructor() {
    const id = localStorage.getItem(CURRENT_USER_ID_KEY);
    if (id) {
      this.id = id;
    } else {
      this.id = nanoid();
      localStorage.setItem(CURRENT_USER_ID_KEY, this.id);
    }
  }

  setName = action((name: string) => {
    this.name = name;
    localStorage.setItem(CURRENT_USER_NAME_KEY, name);
  });
}

decorate(CurrentUser, {
  name: observable
});

export const CurrentUserContext = createContext(new CurrentUser());

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
