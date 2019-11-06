import React, { useState, FC } from "react";
import { PollOption } from "../widgets/PollOption";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";
import { usePoll } from "../models/Poll";
import { PollState } from "../models/PollState";

export type PollOptionsScreenProps = {
  poll: PollState;
};

export const PollOptionsScreen: FC<PollOptionsScreenProps> = ({ poll }) => {
  const pollActions = usePoll(poll.id);
  const [newOptionValue, setNewOptionValue] = useState("");

  const submitOption = () => {
    pollActions.addOption(newOptionValue);
    setNewOptionValue("");
  };

  return (
    <Screen
      title={poll.name}
      subTitle="Add options to vote on:"
      actions={
        <Button type="submit" onClick={() => pollActions.submitOptions()}>
          I'm out of ideas
        </Button>
      }
    >
      <input
        className="CreatePoll-input"
        placeholder="Add an option"
        value={newOptionValue}
        onChange={e => {
          setNewOptionValue(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (newOptionValue) {
              submitOption();
            }
          }
        }}
      />
      {poll.options && (
        <div style={{ paddingTop: 8 }}>
          {Object.values(poll.options)
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(option => (
              <PollOption key={option.id} label={option.label} />
            ))}
        </div>
      )}
    </Screen>
  );
};
