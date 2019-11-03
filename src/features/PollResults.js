import React from "react";
import { PollOption } from "../widgets/PollOption";
import { Button } from "../widgets/Button";
import { getRanking } from "./getRanking";
import "./PollResults.css";
import { Screen } from "../widgets/Screen";
import { useHistory } from "react-router-dom";

export const PollResults = ({ poll }) => {
  const ranking = getRanking(Object.values(poll.votes));
  const history = useHistory();

  return (
    <Screen
      title={poll.name || "Results"}
      subTitle="Here are the results:"
      actions={
        <Button
          onClick={() => {
            history.push("/");
          }}
        >
          Create another poll
        </Button>
      }
    >
      {ranking.map(([optionId, points], index) => (
        <PollOption
          key={optionId}
          label={poll.options[optionId].label}
          points={points}
        />
      ))}
    </Screen>
  );
};
