import nanoid from "nanoid";
import { action, extendObservable } from "mobx";
import { createContext } from "react";

const CURRENT_USER_ID_KEY = "app.currentUserId";

export class CurrentUser {
  constructor() {
    this.id = localStorage.getItem(CURRENT_USER_ID_KEY);
    if (!this.id) {
      this.id = nanoid();
      localStorage.setItem(CURRENT_USER_ID_KEY, this.id);
    }
    extendObservable(this, {
      name: localStorage.getItem("app.currentUserName") || ""
    });
  }

  setName = action(name => {
    this.name = name;
    localStorage.setItem("app.currentUserName", name);
  });
}

export const CurrentUserContext = createContext(new CurrentUser());
