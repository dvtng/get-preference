import nanoid from "nanoid";
import { useMemo } from "react";
import { Db, DocumentRef } from "../db/Db";
import { Observable, useObservable } from "../widgets/useObservable";
import { useDb } from "../db/DbContext";

const OLD_CURRENT_USER_ID_KEY = "app.currentUserId";
const OLD_CURRENT_USER_NAME_KEY = "app.currentUserName";

type CurrentUserState = {
  id: string;
  name?: string;
};

export class CurrentUser implements Observable<CurrentUserState> {
  private ref: DocumentRef;
  private hasInit = false;

  constructor(db: Db) {
    this.ref = db.collection("app").doc("currentUser");
  }

  private async init(): Promise<DocumentRef> {
    if (this.hasInit) return this.ref;

    const currentUserState = await this.ref
      .get()
      .then(snapshot => snapshot.data() as CurrentUserState);

    if (!currentUserState) {
      const oldId = localStorage.getItem(OLD_CURRENT_USER_ID_KEY);
      if (oldId) {
        // Perform upgrade from previous storage format
        await this.ref.set({
          id: oldId,
          name: localStorage.getItem(OLD_CURRENT_USER_NAME_KEY)
        });
        localStorage.removeItem(OLD_CURRENT_USER_ID_KEY);
        localStorage.removeItem(OLD_CURRENT_USER_NAME_KEY);
      } else {
        // Initialize with a default ID
        await this.ref.set({
          id: nanoid()
        });
      }
    }

    this.hasInit = true;

    return this.ref;
  }

  setName(name: string): Promise<void> {
    return this.init().then(ref => ref.update({ name }));
  }

  get(): Promise<CurrentUserState> {
    return this.init()
      .then(ref => ref.get())
      .then(snapshot => snapshot.data() as CurrentUserState);
  }

  subscribe(onData: (data: CurrentUserState) => void): () => void {
    this.init();
    return this.ref.onSnapshot(snapshot => {
      const data = snapshot.data() as CurrentUserState | undefined;
      if (data) {
        onData(data);
      }
    });
  }
}

export const useCurrentUser = (): CurrentUser => {
  const db = useDb("local");
  return useMemo(() => new CurrentUser(db), [db]);
};

export const useCurrentUserState = (): CurrentUserState | undefined => {
  const currentUser = useCurrentUser();
  return useObservable(currentUser);
};
