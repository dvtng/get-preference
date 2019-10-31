import React from "react";
import { ActionFooter } from "../widgets/ActionFooter";
import { Button } from "../widgets/Button";
import { closePoll } from "../api/PollApi";
import "./PollWaiting.css";

export const PollWaiting = ({ poll }) => {
  return (
    <div>
      <h2>Submitted!</h2>
      <p>Waiting for others to finish voting...</p>
      {Object.entries(poll.users)
        .sort(([idA, userA], [idB, userB]) =>
          userA.name.localeCompare(userB.name)
        )
        .map(([id, user]) => (
          <p key={id}>
            {user.name}:{" "}
            {poll.votes[id] ? (
              <span className="PollWaiting-ready">Ready!</span>
            ) : (
              <span className="PollWaiting-voting">Voting</span>
            )}
          </p>
        ))}
      <ActionFooter>
        <Button onClick={() => closePoll(poll.id)}>Close poll</Button>
      </ActionFooter>
    </div>
  );
};
