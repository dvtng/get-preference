import React, { useState, useCallback, FC } from "react";
import { PollOption } from "../widgets/PollOption";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SubmitVoteButton } from "../features/SubmitVoteButton";
import { Screen } from "../widgets/Screen";
import { shuffle } from "../utilities/shuffle";
import { PollState } from "../models/PollState";
import { useCurrentUserState } from "../models/CurrentUser";
import { LoadingScreen } from "./LoadingScreen";
import { Popup } from "../widgets/Popup";
import { Button } from "../widgets/Button";
import { usePoll } from "../models/Poll";
import { PollWaiting } from "../features/PollWaiting";

export type PollVoteScreenProps = {
  poll: PollState;
};

export const PollVoteScreen: FC<PollVoteScreenProps> = ({ poll }) => {
  const [orderedOptionIds, setOrderedOptionIds] = useState(() => {
    return shuffle(Object.values(poll.options).map(option => option.id));
  });

  const currentUserState = useCurrentUserState();
  const pollActions = usePoll(poll.id);

  const onDragEnd = useCallback(
    props => {
      if (props.destination) {
        const optionId = props.draggableId;
        const fromIndex = props.source.index;
        const toIndex = props.destination.index;
        const updatedOrder = orderedOptionIds.slice();
        updatedOrder.splice(fromIndex, 1);
        updatedOrder.splice(toIndex, 0, optionId);
        setOrderedOptionIds(updatedOrder);
      }
    },
    [orderedOptionIds]
  );

  if (!currentUserState) {
    return <LoadingScreen />;
  }

  const hasVoted = poll.votes && Boolean(poll.votes[currentUserState.id]);

  return (
    <Screen
      actions={
        <SubmitVoteButton
          pollId={poll.id}
          orderedOptionIds={orderedOptionIds}
        />
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="poll-options">
          {provided => (
            <div ref={provided.innerRef}>
              <h2>{poll.name || "Vote"}</h2>
              <h3>Drag the options into your preferred order:</h3>
              {orderedOptionIds.map((optionId, index) => (
                <Draggable key={optionId} draggableId={optionId} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={["draggable"]
                        .concat(
                          snapshot.isDragging && !snapshot.isDropAnimating
                            ? ["dragging"]
                            : []
                        )
                        .join(" ")}
                    >
                      <PollOption
                        label={poll.options[optionId].label}
                        draggable
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Popup
        isOpen={hasVoted}
        actions={
          <>
            <Button onClick={() => pollActions.submitVote(null)}>Back</Button>
            <Button type="submit" onClick={() => pollActions.closePoll()}>
              Close poll
            </Button>
          </>
        }
      >
        <h3>Waiting for everyone to finish voting...</h3>
        <PollWaiting
          poll={poll}
          isReady={userId => Boolean(poll.votes && poll.votes[userId])}
        />
      </Popup>
    </Screen>
  );
};
