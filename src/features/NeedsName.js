import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../models/CurrentUser";
import { observer } from "mobx-react-lite";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";

export const NeedsName = observer(({ children }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");

  const submitName = () => {
    if (name) {
      currentUser.setName(name);
    }
  };

  if (currentUser.name) {
    return children;
  }

  return (
    <Screen
      title="Let's start with your name"
      actions={
        <Button type="submit" disabled={!name} onClick={submitName}>
          Submit
        </Button>
      }
    >
      <input
        placeholder="My name is..."
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
    </Screen>
  );
});
