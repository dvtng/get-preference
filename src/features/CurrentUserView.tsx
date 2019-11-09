import React from "react";
import { Button } from "../widgets/Button";
import { useCurrentUserState } from "../models/CurrentUser";

export const CurrentUserView = () => {
  const currentUserState = useCurrentUserState();
  if (!currentUserState || !currentUserState.name) {
    return null;
  }

  return (
    <Button onClick={() => {}} style={{ background: "transparent" }}>
      {currentUserState.name}
    </Button>
  );
};
