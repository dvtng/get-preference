import nanoid from "nanoid";
import { createContext, useContext } from "react";
import { action, decorate, observable } from "mobx";

const CURRENT_USER_ID_KEY = "app.currentUserId";

export class CurrentUser {
  id: string;
  name: string = localStorage.getItem("app.currentUserName") || "";

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
    localStorage.setItem("app.currentUserName", name);
  });
}

decorate(CurrentUser, {
  name: observable
});

export const CurrentUserContext = createContext(new CurrentUser());

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
