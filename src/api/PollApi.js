import firebase from "firebase/app";

const getDb = () => firebase.firestore();

// Returns promise with pollId
export const createPoll = ({ creatorId, creatorName, pollOptions }) => {
  return getDb()
    .collection("polls")
    .add({
      creatorId,
      status: "OPEN",
      options: pollOptions,
      users: {
        [creatorId]: {
          name: creatorName
        }
      }
    })
    .then(docRef => docRef.id);
};

// Returns unsubscribe function
export const subscribePoll = (pollId, onData) => {
  return getDb()
    .collection("polls")
    .doc(pollId)
    .onSnapshot(doc => {
      onData(doc.data());
    });
};

export const submitVote = (pollId, orderedOptionIds) => {
  // TODO
};
