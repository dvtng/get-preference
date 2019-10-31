import React, { useContext } from "react";
import { Button } from "../widgets/Button";
import { submitVote } from "../api/PollApi";
import { CurrentUserContext } from "../models/CurrentUser";

export const SubmitVoteButton = ({ pollId, orderedOptionIds }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Button
      onClick={() =>
        submitVote({ pollId, userId: currentUser.id, orderedOptionIds })
      }
    >
      Submit
    </Button>
  );
};
