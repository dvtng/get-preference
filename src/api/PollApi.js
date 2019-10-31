import firebase from "firebase/app";

// Returns promise with pollId
export const createPoll = ({ creatorId, creatorName, pollOptions }) => {
  const db = firebase.firestore();

  return db
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
