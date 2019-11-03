import React from "react";
import "./PollWaiting.css";

export const PollWaiting = ({ poll, isReady }) => {
  return Object.entries(poll.users)
    .sort(([idA, userA], [idB, userB]) => userA.name.localeCompare(userB.name))
    .map(([id, user]) => (
      <p key={id}>
        {user.name}:{" "}
        {isReady(id) ? (
          <span className="PollWaiting-ready">Ready!</span>
        ) : (
          <span className="PollWaiting-voting">Waiting...</span>
        )}
      </p>
    ));
};
