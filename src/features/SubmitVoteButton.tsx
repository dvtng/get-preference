import React, { useContext, FC } from "react";
import { Button } from "../widgets/Button";
import { submitVote } from "../api/PollApi";
import { CurrentUserContext } from "../models/CurrentUser";

export type SubmitVoteButtonProps = {
  pollId: string;
  orderedOptionIds: string[];
};

export const SubmitVoteButton: FC<SubmitVoteButtonProps> = ({
  pollId,
  orderedOptionIds
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Button
      type="submit"
      onClick={() =>
        submitVote({ pollId, userId: currentUser.id, orderedOptionIds })
      }
    >
      Submit my preferences
    </Button>
  );
};
