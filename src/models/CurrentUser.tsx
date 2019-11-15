import { useMemo } from "react";
import { Db, DocumentRef } from "../db/Db";
import { Observable, useObservable } from "../widgets/useObservable";
import { useDb } from "../db/DbContext";

export type CurrentUserState = {
  id: string;
  name: string;
};

export const AnonymousUser: CurrentUserState = {
  id: "ANONYMOUS",
  name: "Anonymous"
};

export class CurrentUser implements Observable<CurrentUserState> {
  private ref: DocumentRef;

  constructor(db: Db) {
    this.ref = db.collection("app").doc("currentUser");
  }

  signIn(currentUserState: CurrentUserState) {
    this.ref.set(currentUserState);
  }

  signOut() {
    this.ref.set(AnonymousUser);
  }

  get(): Promise<CurrentUserState> {
    return this.ref
      .get()
      .then(snapshot => (snapshot.data() || AnonymousUser) as CurrentUserState);
  }

  getSignedIn(): Promise<CurrentUserState> {
    return this.get().then(currentUserState => {
      if (currentUserState.id === AnonymousUser.id) {
        throw new Error("Expected signed in user");
      }
      return currentUserState;
    });
  }

  subscribe(onData: (data: CurrentUserState) => void): () => void {
    return this.ref.onSnapshot(snapshot => {
      const data = snapshot.data() as CurrentUserState | undefined;
      if (data) {
        onData(data);
      }
    });
  }
}

export const useCurrentUser = (): CurrentUser => {
  const db = useDb("memory");
  return useMemo(() => new CurrentUser(db), [db]);
};

export const useCurrentUserState = (): CurrentUserState | undefined => {
  const currentUser = useCurrentUser();
  return useObservable(currentUser);
};
