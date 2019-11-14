import React, { FC, Fragment, useState } from "react";
import { PollOption } from "../widgets/PollOption";
import { Button } from "../widgets/Button";
import { Screen } from "../features/Screen";
import { useHistory } from "react-router-dom";
import { PollState } from "../models/PollState";
import { getPreferentialRanking } from "../utilities/getPreferentialRanking";
import { Popup } from "../widgets/Popup";

export type PollResultsProps = {
  poll: PollState;
};

export const PollResultsScreen: FC<PollResultsProps> = ({ poll }) => {
  const history = useHistory();
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const { counts, ranking } = getPreferentialRanking(
    Object.values(poll.votes || {})
  );

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
      <div
        style={{
          height: 56,
          padding: 16,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button
          onClick={() => {
            setIsBreakdownOpen(true);
          }}
        >
          See vote breakdown
        </Button>
      </div>
      <Popup
        isOpen={isBreakdownOpen}
        actions={
          <Button
            onClick={() => {
              setIsBreakdownOpen(false);
            }}
          >
            Close
          </Button>
        }
      >
        <h2>Vote breakdown</h2>
        {Object.entries(poll.votes || {}).map(([userId, votes]) => (
          <Fragment key={userId}>
            <h3>{poll.users[userId].name}</h3>
            {votes.map(optionId => (
              <p key={optionId}>{poll.options[optionId].label}</p>
            ))}
          </Fragment>
        ))}
      </Popup>
    </Screen>
  );
};
