import React, { FC } from "react";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";
import { startVoting } from "../api/PollApi";
import { PollWaiting } from "./PollWaiting";
import { PollType } from "../api/PollType";

export type PollOptionsWaitingProps = {
  poll: PollType;
};

export const PollOptionsWaiting: FC<PollOptionsWaitingProps> = ({ poll }) => (
  <Screen
    title={poll.name}
    subTitle="Waiting for everyone to submit options..."
    actions={
      <Button type="submit" onClick={() => startVoting(poll.id)}>
        Let's vote
      </Button>
    }
  >
    <PollWaiting
      poll={poll}
      isReady={userId =>
        Boolean(poll.submittedOptions && poll.submittedOptions[userId] === true)
      }
    />
  </Screen>
);
