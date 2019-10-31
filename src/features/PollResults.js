import React from "react";
import { ActionFooter } from "../widgets/ActionFooter";
import { Link } from "react-router-dom";
import { PollOption } from "../widgets/PollOption";
import { getRanking } from "./getRanking";

export const PollResults = ({ poll }) => {
  const ranking = getRanking(Object.values(poll.votes));

  return (
    <div>
      <h2>Results</h2>
      <p>Poll is closed. Here are the results:</p>
      {ranking.map(optionId => (
        <PollOption label={poll.options[optionId].label} />
      ))}
      <ActionFooter>
        <Link to="/">Create another poll</Link>
      </ActionFooter>
    </div>
  );
};
