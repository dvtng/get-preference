import React, { useState, FC } from "react";
import { useCurrentUser, useCurrentUserState } from "../models/CurrentUser";
import { Screen } from "../features/Screen";
import { Button } from "../widgets/Button";
import { LoadingScreen } from "./LoadingScreen";

export const NameScreen: FC = ({ children }) => {
  const currentUser = useCurrentUser();
  const currentUserState = useCurrentUserState();
  const [name, setName] = useState("");

  const submitName = () => {
    if (name) {
      currentUser.setName(name);
    }
  };

  if (!currentUserState) return <LoadingScreen />;

  if (currentUserState.name) {
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
};
