import React from "react";
import { ActionFooter } from "../widgets/ActionFooter";
import { Link } from "react-router-dom";
import { PollOption } from "../widgets/PollOption";
import { getRanking } from "./getRanking";
import "./PollResults.css";

export const PollResults = ({ poll }) => {
  const ranking = getRanking(Object.values(poll.votes));

  return (
    <div>
      <h2>Results</h2>
      {ranking.map(([optionId, points], index) => {
        const option = (
          <PollOption
            key={optionId}
            label={poll.options[optionId].label}
            points={points}
          />
        );

        return index === 0 ? (
          <div className="PollResults-winner">
            <div className="PollResults-winner-label">
              <span role="img" aria-label="party">
                🎉
              </span>{" "}
              Winner!{" "}
              <span role="img" aria-label="party">
                🎉
              </span>
            </div>
            {option}
          </div>
        ) : (
          option
        );
      })}
      <ActionFooter>
        <Link to="/">Create another poll</Link>
      </ActionFooter>
    </div>
  );
};
