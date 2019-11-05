import React, { useState, useCallback, FC } from "react";
import { PollOption } from "../widgets/PollOption";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SubmitVoteButton } from "../features/SubmitVoteButton";
import { Screen } from "../widgets/Screen";
import { shuffle } from "../utilities/shuffle";
import { PollType } from "../api/PollType";

export type PollVoteScreenProps = {
  poll: PollType;
};

export const PollVoteScreen: FC<PollVoteScreenProps> = ({ poll }) => {
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
                        .concat(snapshot.isDragging ? ["dragging"] : [])
                        .join(" ")}
                    >
                      <PollOption label={poll.options[optionId].label} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Screen>
  );
};
