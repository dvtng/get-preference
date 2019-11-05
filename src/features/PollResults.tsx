import React, { FC } from "react";
import { PollOption } from "../widgets/PollOption";
import { Button } from "../widgets/Button";
import { getRanking } from "./getRanking";
import "./PollResults.css";
import { Screen } from "../widgets/Screen";
import { useHistory } from "react-router-dom";
import { PollState } from "../models/PollState";

export type PollResultsProps = {
  poll: PollState;
};

export const PollResults: FC<PollResultsProps> = ({ poll }) => {
  const ranking = getRanking(Object.values(poll.votes || {}));
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
