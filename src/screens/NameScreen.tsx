import React, { useState, FC } from "react";
import { useCurrentUser } from "../models/CurrentUser";
import { observer } from "mobx-react-lite";
import { Screen } from "../widgets/Screen";
import { Button } from "../widgets/Button";

export const NameScreen: FC = observer(({ children }) => {
  const currentUser = useCurrentUser();

  const [name, setName] = useState("");

  const submitName = () => {
    if (name) {
      currentUser.setName(name);
    }
  };

  if (currentUser.name) {
    return <>{children}</>;
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
