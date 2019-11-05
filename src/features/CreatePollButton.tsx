import React, { useContext, useCallback, FC } from "react";
import { observer } from "mobx-react-lite";
import { CurrentUserContext } from "../models/CurrentUser";
import { createPoll } from "../api/PollApi";
import { Button, ButtonProps } from "../widgets/Button";
import { useHistory } from "react-router-dom";

export type CreatePollButtonProps = {
  pollName: string;
} & Omit<ButtonProps, "onClick">;

export const CreatePollButton: FC<CreatePollButtonProps> = observer(
  ({ pollName, disabled, ...otherProps }) => {
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory();

    const onClickCreatePollButton = useCallback(() => {
      return createPoll({
        creatorId: currentUser.id,
        creatorName: currentUser.name,
        name: pollName
      }).then(pollId => {
        history.push(`/poll/${encodeURIComponent(pollId)}`);
      });
    }, [pollName, currentUser, history]);

    return (
      <Button
        {...otherProps}
        disabled={disabled || !pollName}
        onClick={onClickCreatePollButton}
      >
        Create poll
      </Button>
    );
  }
);
