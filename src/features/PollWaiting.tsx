import React, { FC } from "react";
import "./PollWaiting.css";
import { PollState } from "../models/PollState";

export type PollWaitingProps = {
  poll: PollState;
  isReady: (userId: string) => boolean;
};

export const PollWaiting: FC<PollWaitingProps> = ({ poll, isReady }) => {
  return (
    <>
      {Object.entries(poll.users)
        .sort(([idA, userA], [idB, userB]) =>
          userA.name.localeCompare(userB.name)
        )
        .map(([id, user]) => (
          <p key={id} className="PollWaiting-row">
            <span className="PollWaiting-name">{user.name}:</span>
            {isReady(id) ? (
              <span className="PollWaiting-status PollWaiting-ready">
                Ready!
              </span>
            ) : (
              <span className="PollWaiting-status PollWaiting-voting">
                Waiting...
              </span>
            )}
          </p>
        ))}
    </>
  );
};
