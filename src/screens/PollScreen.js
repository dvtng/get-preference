import React from "react";
import { usePoll } from "../features/usePoll";
import { VotePoll } from "../features/VotePoll";
import { Loading } from "../widgets/Loading";

export const PollScreen = ({ pollId }) => {
  const poll = usePoll(pollId);

  if (!poll) {
    return <Loading />;
  }

  return (
    <div>{poll.status === "OPEN" ? <VotePoll poll={poll} /> : "Closed"}</div>
  );
};
