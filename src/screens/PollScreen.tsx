import React, { useEffect, FC } from "react";
import { usePollState, usePoll } from "../models/Poll";
import { PollVoteScreen } from "./PollVoteScreen";
import { LoadingScreen } from "./LoadingScreen";
import { useCurrentUserState } from "../models/CurrentUser";
import { PollOptionsScreen } from "./PollOptionsScreen";
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

  return pollState.status === "OPTIONS" ? (
    <PollOptionsScreen poll={pollState} />
  ) : pollState.status === "OPEN" ? (
    <PollVoteScreen poll={pollState} />
  ) : (
    <PollResultsScreen poll={pollState} />
  );
};
