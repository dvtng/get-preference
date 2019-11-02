import React, { useState, useCallback, useEffect, useContext } from "react";
import { PollOption } from "../widgets/PollOption";
import { ActionFooter } from "../widgets/ActionFooter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SubmitVoteButton } from "./SubmitVoteButton";
import { joinPoll } from "../api/PollApi";
import { CurrentUserContext } from "../models/CurrentUser";
import { observer } from "mobx-react-lite";

const swap = (array, a, b) => {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};

const shuffle = array => {
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j);
  }
  return array;
};

export const PollVoting = observer(({ poll }) => {
  const [orderedOptionIds, setOrderedOptionIds] = useState(() => {
    return shuffle(Object.values(poll.options).map(option => option.id));
  });

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

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    joinPoll({
      pollId: poll.id,
      userId: currentUser.id,
      userName: currentUser.name
    });
  }, [poll, currentUser]);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="poll-options">
          {provided => (
            <div ref={provided.innerRef}>
              <h2>{poll.name || "Vote"}</h2>
              <p>Drag the options into your preferred order:</p>
              {orderedOptionIds.map((optionId, index) => (
                <Draggable key={optionId} draggableId={optionId} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={
                        snapshot.isDragging
                          ? {
                              ...provided.draggableProps.style,
                              background: "#777"
                            }
                          : provided.draggableProps.style
                      }
                    >
                      <PollOption label={poll.options[optionId].label} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <ActionFooter>
                <SubmitVoteButton
                  pollId={poll.id}
                  orderedOptionIds={orderedOptionIds}
                />
              </ActionFooter>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});
