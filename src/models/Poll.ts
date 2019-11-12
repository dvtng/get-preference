import { useMemo } from "react";
import uuid from "nanoid";
import { PollState, Option } from "./PollState";
import { CurrentUser, useCurrentUser } from "./CurrentUser";
import { Db, DocumentRef, Data } from "../db/Db";
import { useDb } from "../db/DbContext";
import { useObservable, Observable } from "../widgets/useObservable";

const COLLECTION_NAME = "polls";

export class Poll implements Observable<PollState> {
  static async create(
    db: Db,
    currentUser: CurrentUser,
    name: string
  ): Promise<Poll> {
    const currentUserState = await currentUser.get();
    const { id } = await db.collection(COLLECTION_NAME).add({
      creatorId: currentUserState.id,
      status: "OPTIONS",
      name,
      users: {
        [currentUserState.id]: {
          name: currentUserState.name
        }
      },
      options: {}
    });
    return new Poll(db, currentUser, id);
  }

  id: string;
  private currentUser: CurrentUser;
  private ref: DocumentRef;

  constructor(db: Db, currentUser: CurrentUser, id: string) {
    this.id = id;
    this.currentUser = currentUser;
    this.ref = db.collection(COLLECTION_NAME).doc(id);
  }

  async join() {
    const currentUserState = await this.currentUser.get();
    return this.ref.update({
      [`users.${currentUserState.id}`]: {
        name: currentUserState.name
      }
    });
  }

  async addOption(label: string): Promise<Option> {
    const currentUserState = await this.currentUser.get();
    const id = uuid();
    const option: Option = {
      id,
      creatorId: currentUserState.id,
      createdAt: Date.now(),
      label
    };
    return this.ref
      .update({
        [`options.${id}`]: option
      })
      .then(() => option);
  }

  async removeOption(id: string) {
    return this.ref.update({
      [`options.${id}`]: null
    });
  }

  async submitOptions(submitted: boolean = true): Promise<void> {
    const currentUserState = await this.currentUser.get();
    return this.ref.update({
      [`submittedOptions.${currentUserState.id}`]: submitted
    });
  }

  startVoting(): Promise<void> {
    return this.ref.update({
      status: "OPEN"
    });
  }

  async submitVote(orderedOptionIds: string[] | null): Promise<void> {
    const currentUserState = await this.currentUser.get();
    return this.ref.update({
      [`votes.${currentUserState.id}`]: orderedOptionIds
    });
  }

  closePoll(): Promise<void> {
    return this.ref.update({
      status: "CLOSED"
    });
  }

  get(): Promise<PollState> {
    return this.ref.get().then(snapshot => {
      const data = snapshot.data() as Data;
      return this.toPollState(data);
    });
  }

  subscribe(onData: (data: PollState) => void): () => void {
    return this.ref.onSnapshot(doc => {
      const data = doc.data();
      if (data) {
        onData(this.toPollState(data));
      }
    });
  }

  private toPollState(data: Data): PollState {
    return {
      ...data,
      id: this.id,
      options: Object.fromEntries(
        Object.entries(data.options).filter(([id, option]) => option)
      )
    } as PollState;
  }
}

export const usePoll = (pollId: string): Poll => {
  const db = useDb("remote");
  const currentUser = useCurrentUser();
  return useMemo(() => new Poll(db, currentUser, pollId), [
    db,
    currentUser,
    pollId
  ]);
};

export const usePollState = (pollId: string): PollState | undefined => {
  const poll = usePoll(pollId);
  return useObservable(poll);
};
