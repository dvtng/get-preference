import React from "react";
import { ActionFooter } from "../widgets/ActionFooter";
import { Button } from "../widgets/Button";
import { closePoll } from "../api/PollApi";

export const PollWaiting = ({ poll }) => {
  return (
    <div>
      <p>Waiting for others to finish voting...</p>
      <ActionFooter>
        <Button onClick={() => closePoll(poll.id)}>Close poll</Button>
      </ActionFooter>
    </div>
  );
};
