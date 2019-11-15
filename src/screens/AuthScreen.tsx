import React, { FC } from "react";
import { useCurrentUserState, AnonymousUser } from "../models/CurrentUser";
import { Screen } from "../features/Screen";
import { Button } from "../widgets/Button";
import { signIn } from "../firebase";
import { LoadingScreen } from "./LoadingScreen";
import { IoLogoGoogle } from "react-icons/io";

export const AuthScreen: FC = ({ children }) => {
  const currentUserState = useCurrentUserState();

  if (!currentUserState) {
    return <LoadingScreen />;
  }

  if (currentUserState !== AnonymousUser) {
    return <>{children}</>;
  }

  return (
    <Screen>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <h2>Sign in to get started</h2>
        <p style={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" onClick={() => signIn()}>
            <IoLogoGoogle />
            <span style={{ marginLeft: 8 }}>Sign in</span>
          </Button>
        </p>
      </div>
    </Screen>
  );
};
