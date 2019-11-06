import { useEffect, useState, useMemo } from "react";
import uuid from "nanoid";
import { PollState, Option } from "./PollState";
import { CurrentUser, useCurrentUser } from "./CurrentUser";
import { Db, DocumentRef } from "../db/Db";
import { useDb } from "../db/DbContext";

const COLLECTION_NAME = "polls";

export class Poll {
  static create(db: Db, currentUser: CurrentUser, name: string): Promise<Poll> {
    return db
      .collection(COLLECTION_NAME)
      .add({
        creatorId: currentUser.id,
        status: "OPTIONS",
        name,
        users: {
          [currentUser.id]: {
            name: currentUser.name
          }
        },
        options: {}
      })
      .then(docRef => new Poll(db, currentUser, docRef.id));
  }

  id: string;
  private currentUser: CurrentUser;
  private ref: DocumentRef;
  private data: PollState | undefined = undefined;

  constructor(db: Db, currentUser: CurrentUser, id: string) {
    this.id = id;
    this.currentUser = currentUser;
    this.ref = db.collection(COLLECTION_NAME).doc(id);
  }

  join() {
    return this.ref.update({
      [`users.${this.currentUser.id}`]: {
        name: this.currentUser.name
      }
    });
  }

  addOption(label: string): Promise<Option> {
    const id = uuid();
    const option: Option = {
      id,
      creatorId: this.currentUser.id,
      createdAt: Date.now(),
      label
    };
    return this.ref
      .update({
        [`options.${id}`]: option
      })
      .then(() => option);
  }

  submitOptions() {
    return this.ref.update({
      [`submittedOptions.${this.currentUser.id}`]: true
    });
  }

  startVoting() {
    return this.ref.update({
      status: "OPEN"
    });
  }

  submitVote(orderedOptionIds: string[]) {
    return this.ref.update({
      [`votes.${this.currentUser.id}`]: orderedOptionIds
    });
  }

  closePoll() {
    return this.ref.update({
      status: "CLOSED"
    });
  }

  get(): Promise<PollState> {
    return this.ref.get().then(snapshot => snapshot.data() as PollState);
  }

  subscribe(onData: (data: PollState) => void): () => void {
    return this.ref.onSnapshot(doc => {
      const data = doc.data();
      if (data) {
        const poll = {
          ...data,
          id: this.id
        } as PollState;
        this.data = poll;
        onData(poll);
      } else {
        this.data = data;
      }
    });
  }
}

export const usePollState = (pollId: string): PollState | null => {
  const poll = usePollActions(pollId);
  const [pollData, setPollData] = useState<PollState | null>(null);

  useEffect(() => {
    return poll.subscribe(data => {
      setPollData(data);
    });
  }, [poll]);

  return pollData;
};

export const usePollActions = (pollId: string): Poll => {
  const db = useDb("remote");
  const currentUser = useCurrentUser();
  return useMemo(() => new Poll(db, currentUser, pollId), [
    db,
    currentUser,
    pollId
  ]);
};
