import React, { FC } from "react";
import { PollOption } from "../widgets/PollOption";
import { Button } from "../widgets/Button";
import { Screen } from "../features/Screen";
import { useHistory } from "react-router-dom";
import { PollState } from "../models/PollState";
import { getPreferentialRanking } from "../utilities/getPreferentialRanking";

export type PollResultsProps = {
  poll: PollState;
};

export const PollResultsScreen: FC<PollResultsProps> = ({ poll }) => {
  const { counts, ranking } = getPreferentialRanking(
    Object.values(poll.votes || {})
  );
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
      {ranking.map(optionId => {
        const votes = counts[optionId];
        return (
          <PollOption
            key={optionId}
            label={poll.options[optionId].label}
            progress={votes / counts[ranking[0]]}
            right={
              <small>
                {votes} vote{votes !== 1 ? "s" : ""}
              </small>
            }
          />
        );
      })}
    </Screen>
  );
};
