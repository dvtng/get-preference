import React, { useState, useContext } from "react";
import { PollOption } from "../widgets/PollOption";
import { createOption } from "../models/Option";
import { Screen } from "../widgets/Screen";
import { CurrentUserContext } from "../models/CurrentUser";
import { addOption, submitOptions } from "../api/PollApi";
import { Button } from "../widgets/Button";

export const PollOptions = ({ poll }) => {
  const currentUser = useContext(CurrentUserContext);
  const [newOptionValue, setNewOptionValue] = useState("");

  const submitOption = () => {
    const option = createOption({
      label: newOptionValue,
      creatorId: currentUser.id
    });
    addOption({ pollId: poll.id, option });
    setNewOptionValue("");
  };

  return (
    <Screen
      title={poll.name}
      subTitle="Add options to vote on:"
      actions={
        <Button
          type="submit"
          onClick={() =>
            submitOptions({ pollId: poll.id, userId: currentUser.id })
          }
        >
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
