import React, { useState } from "react";
import { CreatePollButton } from "../features/CreatePollButton";
import { Screen } from "../features/Screen";

export const PollCreateScreen = () => {
  const [pollName, setPollName] = useState("");

  return (
    <Screen
      title="Create a new poll"
      actions={<CreatePollButton type="submit" pollName={pollName} />}
    >
      <input
        className="CreatePoll-input"
        placeholder="What would you like to ask?"
        value={pollName}
        onChange={e => {
          setPollName(e.target.value);
        }}
      />
    </Screen>
  );
};
