import React, { useEffect, FC } from "react";
import { usePollState, usePoll } from "../models/Poll";
import { PollVoteScreen } from "./PollVoteScreen";
import { LoadingScreen } from "./LoadingScreen";
import { useCurrentUserState } from "../models/CurrentUser";
import { PollOptionsWaiting } from "../features/PollOptionsWaiting";
import { PollOptionsScreen } from "./PollOptionsScreen";
import { PollVoteWaiting } from "../features/PollVoteWaiting";
import { PollResultsScreen } from "./PollResultsScreen";

export type PollScreenProps = {
  pollId: string;
};

export const PollScreen: FC<PollScreenProps> = ({ pollId }) => {
  const pollState = usePollState(pollId);
  const pollActions = usePoll(pollId);
  const currentUserState = useCurrentUserState();

  useEffect(() => {
    pollActions.join();
  }, [pollActions]);

  if (!pollState || !currentUserState) {
    return <LoadingScreen />;
  }

  const hasSubmittedOptions =
    pollState.submittedOptions &&
    pollState.submittedOptions[currentUserState.id];
  const hasVoted = pollState.votes && pollState.votes[currentUserState.id];

  return pollState.status === "OPTIONS" ? (
    hasSubmittedOptions ? (
      <PollOptionsWaiting poll={pollState} />
    ) : (
      <PollOptionsScreen poll={pollState} />
    )
  ) : pollState.status === "OPEN" ? (
    hasVoted ? (
      <PollVoteWaiting poll={pollState} />
    ) : (
      <PollVoteScreen poll={pollState} />
    )
  ) : (
    <PollResultsScreen poll={pollState} />
  );
};
