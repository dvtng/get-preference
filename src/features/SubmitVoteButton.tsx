import React, { FC } from "react";
import { Button } from "../widgets/Button";
import { usePoll } from "../models/Poll";

export type SubmitVoteButtonProps = {
  pollId: string;
  orderedOptionIds: string[];
};

export const SubmitVoteButton: FC<SubmitVoteButtonProps> = ({
  pollId,
  orderedOptionIds
}) => {
  const pollActions = usePoll(pollId);

  return (
    <Button
      type="submit"
      onClick={() => pollActions.submitVote(orderedOptionIds)}
    >
      Submit my preferences
    </Button>
  );
};
