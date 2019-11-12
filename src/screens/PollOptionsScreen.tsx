import React, { useState, FC } from "react";
import { PollOption } from "../widgets/PollOption";
import { Screen } from "../features/Screen";
import { Button } from "../widgets/Button";
import { usePoll } from "../models/Poll";
import { PollState } from "../models/PollState";
import { useCurrentUserState } from "../models/CurrentUser";
import { LoadingScreen } from "./LoadingScreen";
import { Popup } from "../widgets/Popup";
import { PollWaiting } from "../features/PollWaiting";
import { MdClose } from "react-icons/md";
import { useConfirmationPopup } from "../widgets/useConfirmationPopup";

export type PollOptionsScreenProps = {
  poll: PollState;
};

export const PollOptionsScreen: FC<PollOptionsScreenProps> = ({ poll }) => {
  const pollActions = usePoll(poll.id);
  const [newOptionValue, setNewOptionValue] = useState("");
  const currentUserState = useCurrentUserState();
  const confirmationPopup = useConfirmationPopup();

  if (!currentUserState) {
    return <LoadingScreen />;
  }

  const hasSubmitted =
    poll.submittedOptions && poll.submittedOptions[currentUserState.id];

  const submitOption = () => {
    if (newOptionValue) {
      pollActions.addOption(newOptionValue);
      setNewOptionValue("");
    }
  };

  return (
    <Screen
      title={poll.name}
      subTitle="Add options to vote on:"
      actions={
        <Button type="submit" onClick={() => pollActions.submitOptions()}>
          I'm ready to vote
        </Button>
      }
    >
      <input
        className="CreatePoll-input"
        placeholder="Add an option"
        value={newOptionValue}
        onChange={e => {
          setNewOptionValue(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitOption();
          }
        }}
      />
      {poll.options && (
        <div style={{ paddingTop: 16 }}>
          {Object.values(poll.options)
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(option => (
              <PollOption
                key={option.id}
                label={option.label}
                right={
                  <div
                    style={{
                      marginRight: -22,
                      borderTopRightRadius: 4,
                      borderBottomRightRadius: 4,
                      overflow: "hidden"
                    }}
                  >
                    <Button
                      onClick={() =>
                        confirmationPopup.show({
                          message:
                            "Are you sure you want to delete this option?",
                          onConfirm: () => pollActions.removeOption(option.id)
                        })
                      }
                    >
                      <MdClose />
                    </Button>
                  </div>
                }
              />
            ))}
        </div>
      )}
      {confirmationPopup.popup}
      <Popup
        isOpen={hasSubmitted}
        actions={
          <>
            <Button onClick={() => pollActions.submitOptions(false)}>
              Back
            </Button>
            <Button type="submit" onClick={() => pollActions.startVoting()}>
              Lock options
            </Button>
          </>
        }
      >
        <h3>Waiting for everyone to submit options...</h3>
        <PollWaiting
          poll={poll}
          isReady={userId =>
            Boolean(
              poll.submittedOptions && poll.submittedOptions[userId] === true
            )
          }
        />
      </Popup>
    </Screen>
  );
};
