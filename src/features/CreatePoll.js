import React, { useState, useCallback } from "react";
import nanoid from "nanoid";
import { PollOption } from "../widgets/PollOption";
import "./CreatePoll.css";

const createOption = label => {
  return {
    id: nanoid(),
    label
  };
};

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
      <div className="CreatePoll-footer">
        <button disabled={pollOptions.length < 2}>Create poll</button>
      </div>
    </div>
  );
};
