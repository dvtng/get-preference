import React, { FC } from "react";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";
import { PollWaiting } from "./PollWaiting";
import { PollState } from "../models/PollState";
import { usePoll } from "../models/Poll";

export type PollOptionsWaitingProps = {
  poll: PollState;
};

export const PollOptionsWaiting: FC<PollOptionsWaitingProps> = ({ poll }) => {
  const pollActions = usePoll(poll.id);

  return (
    <Screen
      title={poll.name}
      subTitle="Waiting for everyone to submit options..."
      actions={
        <Button type="submit" onClick={() => pollActions.startVoting()}>
          Let's vote
        </Button>
      }
    >
      <PollWaiting
        poll={poll}
        isReady={userId =>
          Boolean(
            poll.submittedOptions && poll.submittedOptions[userId] === true
          )
        }
      />
    </Screen>
  );
};
