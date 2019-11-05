import firebase from "firebase/app";
import { PollType, Option } from "./PollType";

const getDb = () => firebase.firestore();

export type CreatePollProps = {
  creatorId: string;
  creatorName: string;
  name: string;
};

// Returns promise with pollId
export const createPoll = ({
  creatorId,
  creatorName,
  name
}: CreatePollProps): Promise<string> => {
  return getDb()
    .collection("polls")
    .add({
      creatorId,
      status: "OPTIONS",
      name,
      users: {
        [creatorId]: {
          name: creatorName
        }
      },
      options: {}
    })
    .then(docRef => docRef.id);
};

// Returns unsubscribe function
export const subscribePoll = (
  pollId: string,
  onData: (data: PollType) => void
): (() => void) => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .onSnapshot(doc => {
      const data = doc.data();
      if (data) {
        data.id = pollId;
        onData(data as PollType);
      }
    });
};

export type JoinPollProps = {
  pollId: string;
  userId: string;
  userName: string;
};

export const joinPoll = ({
  pollId,
  userId,
  userName
}: JoinPollProps): Promise<void> => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .update({
      [`users.${userId}`]: {
        name: userName
      }
    });
};

export type AddOptionProps = {
  pollId: string;
  option: Option;
};

export const addOption = ({
  pollId,
  option
}: AddOptionProps): Promise<void> => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .update({
      [`options.${option.id}`]: option
    });
};

export type SubmitOptionsProps = {
  pollId: string;
  userId: string;
};

export const submitOptions = ({
  pollId,
  userId
}: SubmitOptionsProps): Promise<void> => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .update({
      [`submittedOptions.${userId}`]: true
    });
};

export const startVoting = (pollId: string): Promise<void> => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .update({
      status: "OPEN"
    });
};

export type SubmitVoteProps = {
  pollId: string;
  userId: string;
  orderedOptionIds: string[];
};

export const submitVote = ({
  pollId,
  userId,
  orderedOptionIds
}: SubmitVoteProps): Promise<void> => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .update({
      [`votes.${userId}`]: orderedOptionIds
    });
};

export const closePoll = (pollId: string): Promise<void> => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .update({
      status: "CLOSED"
    });
};
