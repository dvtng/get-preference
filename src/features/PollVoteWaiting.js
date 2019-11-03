import React from "react";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";
import { PollWaiting } from "./PollWaiting";
import { closePoll } from "../api/PollApi";

export const PollVoteWaiting = ({ poll }) => (
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
      isReady={userId => poll.votes && poll.votes[userId]}
    />
  </Screen>
);
