import React, { useEffect, FC } from "react";
import { usePollState, usePollActions } from "../models/Poll";
import { PollVoteScreen } from "./PollVoteScreen";
import { LoadingScreen } from "./LoadingScreen";
import { useCurrentUser } from "../models/CurrentUser";
import { PollOptionsWaiting } from "../features/PollOptionsWaiting";
import { PollOptionsScreen } from "./PollOptionsScreen";
import { PollVoteWaiting } from "../features/PollVoteWaiting";
import { PollResults } from "../features/PollResults";

export type PollScreenProps = {
  pollId: string;
};

export const PollScreen: FC<PollScreenProps> = ({ pollId }) => {
  const poll = usePollState(pollId);
  const pollActions = usePollActions(pollId);
  const currentUser = useCurrentUser();

  useEffect(() => {
    pollActions.join();
  }, [pollActions]);

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
