import { observable } from "mobx";
import nanoid from "nanoid";

export class AppState {
  userId = nanoid();

  @observable
  userName = "";
}
