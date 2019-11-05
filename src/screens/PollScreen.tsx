import React, { useEffect, FC } from "react";
import { usePoll } from "../models/Poll";
import { PollVoteScreen } from "./PollVoteScreen";
import { LoadingScreen } from "./LoadingScreen";
import { useCurrentUser } from "../models/CurrentUser";
import { PollOptionsWaiting } from "../features/PollOptionsWaiting";
import { PollOptionsScreen } from "./PollOptionsScreen";
import { PollVoteWaiting } from "../features/PollVoteWaiting";
import { PollResults } from "../features/PollResults";
import { joinPoll } from "../api/PollApi";

export type PollScreenProps = {
  pollId: string;
};

export const PollScreen: FC<PollScreenProps> = ({ pollId }) => {
  const poll = usePoll(pollId);
  const currentUser = useCurrentUser();
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
      <PollOptionsScreen poll={poll} />
    )
  ) : poll.status === "OPEN" ? (
    hasVoted ? (
      <PollVoteWaiting poll={poll} />
    ) : (
      <PollVoteScreen poll={poll} />
    )
  ) : (
    <PollResults poll={poll} />
  );
};
