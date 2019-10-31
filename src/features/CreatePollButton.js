import React, { useContext, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { CurrentUserContext } from "../models/CurrentUser";
import { createPoll } from "../api/PollApi";
import { Button } from "../widgets/Button";
import { useHistory } from "react-router-dom";

export const CreatePollButton = observer(({ pollOptions }) => {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();

  const onClickCreatePollButton = useCallback(() => {
    return createPoll({
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      pollOptions
    }).then(pollId => {
      history.push(`/poll/${encodeURIComponent(pollId)}`);
    });
  }, [pollOptions, currentUser, history]);

  return (
    <Button disabled={pollOptions.length < 2} onClick={onClickCreatePollButton}>
      Create poll
    </Button>
  );
});
