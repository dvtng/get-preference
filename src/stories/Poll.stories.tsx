import React from "react";
import { PollCreateScreen } from "../screens/PollCreateScreen";
import { Setup } from "./Setup";
import { Poll } from "../models/Poll";
import { PollOptionsScreen } from "../screens/PollOptionsScreen";
import { PollVoteScreen } from "../screens/PollVoteScreen";
import { Db } from "../api/Db";
import { CurrentUser } from "../models/CurrentUser";
import { PollResultsScreen } from "../screens/PollResultsScreen";

const createPoll = async (db: Db, currentUser: CurrentUser) => {
  const poll = await Poll.create(
    db,
    currentUser,
    "What is your favorite color?"
  );

  const green = await poll.addOption("Green");
  const red = await poll.addOption("Red");
  const blue = await poll.addOption("Blue");
  const indigo = await poll.addOption("Indigo");

  await poll.submitVote([red.id, green.id, blue.id, indigo.id]);

  return poll;
};

export default {
  title: "Poll"
};

export const pollCreateScreen = () => <PollCreateScreen />;

export const pollOptionsScreen = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createPoll(db, currentUser);
      const pollState = await poll.get();
      return <PollOptionsScreen poll={pollState} />;
    }}
  </Setup>
);

export const pollVoteScreen = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createPoll(db, currentUser);
      const pollState = await poll.get();
      return <PollVoteScreen poll={pollState} />;
    }}
  </Setup>
);

export const pollResultsScreen = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createPoll(db, currentUser);
      const pollState = await poll.get();
      return <PollResultsScreen poll={pollState} />;
    }}
  </Setup>
);
