import React, { FC } from "react";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";
import { PollWaiting } from "./PollWaiting";
import { closePoll } from "../api/PollApi";
import { PollType } from "../api/PollType";

export type PollVoteWaitingProps = {
  poll: PollType;
};

export const PollVoteWaiting: FC<PollVoteWaitingProps> = ({ poll }) => (
  <Screen
    title={poll.name}
    subTitle="Waiting for everyone to finish voting..."
    actions={
      <Button type="submit" onClick={() => closePoll(poll.id)}>
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
