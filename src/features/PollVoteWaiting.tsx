import React, { FC } from "react";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";
import { PollWaiting } from "./PollWaiting";
import { PollState } from "../models/PollState";
import { usePollActions } from "../models/Poll";

export type PollVoteWaitingProps = {
  poll: PollState;
};

export const PollVoteWaiting: FC<PollVoteWaitingProps> = ({ poll }) => {
  const pollActions = usePollActions(poll.id);

  return (
    <Screen
      title={poll.name}
      subTitle="Waiting for everyone to finish voting..."
      actions={
        <Button type="submit" onClick={() => pollActions.closePoll()}>
          Close poll
        </Button>
      }
    >
      <PollWaiting
        poll={poll}
        isReady={userId => Boolean(poll.votes && poll.votes[userId])}
      />
    </Screen>
  );
};
