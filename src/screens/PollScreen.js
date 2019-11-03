import React, { useContext, useEffect } from "react";
import { usePoll } from "../features/usePoll";
import { PollVote } from "../features/PollVote";
import { LoadingScreen } from "./LoadingScreen";
import { CurrentUserContext } from "../models/CurrentUser";
import { PollOptionsWaiting } from "../features/PollOptionsWaiting";
import { PollOptions } from "../features/PollOptions";
import { PollVoteWaiting } from "../features/PollVoteWaiting";
import { PollResults } from "../features/PollResults";
import { joinPoll } from "../api/PollApi";

export const PollScreen = ({ pollId }) => {
  const poll = usePoll(pollId);
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    joinPoll({ pollId, userId: currentUser.id, userName: currentUser.name });
  }, [pollId, currentUser]);

  if (!poll) {
    return <LoadingScreen />;
  }

  const hasSubmittedOptions =
    poll.submittedOptions && poll.submittedOptions[currentUser.id];
  const hasVoted = poll.votes && poll.votes[currentUser.id];

  return poll.status === "OPTIONS" ? (
    hasSubmittedOptions ? (
      <PollOptionsWaiting poll={poll} />
    ) : (
      <PollOptions poll={poll} />
    )
  ) : poll.status === "OPEN" ? (
    hasVoted ? (
      <PollVoteWaiting poll={poll} />
    ) : (
      <PollVote poll={poll} />
    )
  ) : (
    <PollResults poll={poll} />
  );
};
