import React, { useState, useCallback } from "react";
import { PollOption } from "../widgets/PollOption";
import { ActionFooter } from "../widgets/ActionFooter";
import { createOption } from "../models/Option";
import { CreatePollButton } from "./CreatePollButton";

export const CreatePoll = () => {
  const [pollOptions, setPollOptions] = useState([]);

  const [newOptionValue, setNewOptionValue] = useState("");
  const onChangeNewOptionValue = useCallback(e => {
    setNewOptionValue(e.target.value);
  }, []);
  const onSubmitNewOptionValue = useCallback(
    e => {
      e.preventDefault();
      if (newOptionValue === "") {
        return;
      }

      setPollOptions(pollOptions.concat([createOption(newOptionValue)]));
      setNewOptionValue("");
    },
    [pollOptions, newOptionValue]
  );

  return (
    <div>
      <h2>Create a new poll</h2>
      <form onSubmit={onSubmitNewOptionValue}>
        <input
          placeholder="Add an option"
          value={newOptionValue}
          onChange={onChangeNewOptionValue}
        />
      </form>
      <div>
        {pollOptions.map(option => (
          <PollOption key={option.id} label={option.label} />
        ))}
      </div>
      <ActionFooter>
        <CreatePollButton pollOptions={pollOptions} />
      </ActionFooter>
    </div>
  );
};
