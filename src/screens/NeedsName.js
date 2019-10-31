import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../models/CurrentUser";
import { observer } from "mobx-react-lite";

export const NeedsName = observer(({ children }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");

  if (currentUser.name) {
    return children;
  }

  return (
    <div>
      <h2>Let's start with your name</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          currentUser.setName(name);
        }}
      >
        <input
          placeholder="My name is..."
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </form>
    </div>
  );
});
