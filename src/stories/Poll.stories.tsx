import React from "react";
import { PollCreateScreen } from "../screens/PollCreateScreen";
import { Setup } from "./Setup";
import { Poll } from "../models/Poll";
import { Db } from "../db/Db";
import { CurrentUser } from "../models/CurrentUser";
import { PollScreen } from "../screens/PollScreen";
import { MemoryDb } from "../db/MemoryDb";

const createExamplePoll = async (db: Db, currentUser: CurrentUser) => {
  await currentUser.setName("Polly");
  const poll = await Poll.create(
    db,
    currentUser,
    "What is your favorite color?"
  );
  await poll.join();
  return poll;
};

const addExampleOptions = async (poll: Poll) => {
  const green = await poll.addOption("Green");
  const red = await poll.addOption("Red");
  const blue = await poll.addOption("Blue");
  const indigo = await poll.addOption("Indigo");
  return [green, red, blue, indigo];
};

const joinPollAsUser = async (db: Db, pollId: string, name: string) => {
  const currentUser = new CurrentUser(new MemoryDb());
  await currentUser.setName(name);
  const poll = new Poll(db, currentUser, pollId);
  await poll.join();
  return poll;
};

export default {
  title: "Poll"
};

export const createPoll = () => (
  <Setup>
    {async (db, currentUser) => {
      currentUser.setName("Polly");
      return <PollCreateScreen />;
    }}
  </Setup>
);

export const addOptions = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createExamplePoll(db, currentUser);
      await addExampleOptions(poll);
      return <PollScreen pollId={poll.id} />;
    }}
  </Setup>
);

export const addOptionsWaiting = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createExamplePoll(db, currentUser);
      await addExampleOptions(poll);
      await poll.submitOptions();
      await joinPollAsUser(db, poll.id, "Molly");
      await joinPollAsUser(db, poll.id, "Olly");
      return <PollScreen pollId={poll.id} />;
    }}
  </Setup>
);

export const vote = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createExamplePoll(db, currentUser);
      await addExampleOptions(poll);
      await poll.startVoting();
      return <PollScreen pollId={poll.id} />;
    }}
  </Setup>
);

export const voteWaiting = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createExamplePoll(db, currentUser);
      const options = await addExampleOptions(poll);
      await poll.startVoting();
      await poll.submitVote(options.map(o => o.id));
      const mollyPoll = await joinPollAsUser(db, poll.id, "Molly");
      await mollyPoll.submitVote(options.map(o => o.id));
      await joinPollAsUser(db, poll.id, "Olly");
      return <PollScreen pollId={poll.id} />;
    }}
  </Setup>
);

export const results = () => (
  <Setup>
    {async (db, currentUser) => {
      const poll = await createExamplePoll(db, currentUser);
      const options = await addExampleOptions(poll);
      await poll.submitVote(options.map(o => o.id));
      const mollyPoll = await joinPollAsUser(db, poll.id, "Molly");
      await mollyPoll.submitVote(options.map(o => o.id));
      await poll.closePoll();
      return <PollScreen pollId={poll.id} />;
    }}
  </Setup>
);
