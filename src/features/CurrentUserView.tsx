import React from "react";
import { Button } from "../widgets/Button";
import { useCurrentUserState, AnonymousUser } from "../models/CurrentUser";

export const CurrentUserView = () => {
  const currentUserState = useCurrentUserState();
  if (!currentUserState || currentUserState === AnonymousUser) {
    return null;
  }

  return (
    <Button onClick={() => {}} style={{ background: "transparent" }}>
      {currentUserState.name.split(" ")[0]}
    </Button>
  );
};
