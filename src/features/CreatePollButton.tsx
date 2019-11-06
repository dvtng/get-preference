import React, { FC } from "react";
import { useCurrentUser } from "../models/CurrentUser";
import { Button, ButtonProps } from "../widgets/Button";
import { useHistory } from "react-router-dom";
import { useDb } from "../db/DbContext";
import { Poll } from "../models/Poll";

export type CreatePollButtonProps = {
  pollName: string;
} & Omit<ButtonProps, "onClick">;

export const CreatePollButton: FC<CreatePollButtonProps> = ({
  pollName,
  disabled,
  ...otherProps
}) => {
  const db = useDb("remote");
  const currentUser = useCurrentUser();
  const history = useHistory();

  return (
    <Button
      {...otherProps}
      disabled={disabled || !pollName}
      onClick={async () => {
        return Poll.create(db, currentUser, pollName).then(poll => {
          history.push(`/poll/${encodeURIComponent(poll.id)}`);
        });
      }}
    >
      Create poll
    </Button>
  );
};
