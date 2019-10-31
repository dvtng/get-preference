import React, { useState, useCallback } from "react";
import { PollOption } from "../widgets/PollOption";
import { ActionFooter } from "../widgets/ActionFooter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const VotePoll = ({ poll }) => {
  const [orderedOptionIds, setOrderedOptionIds] = useState(() => {
    // TODO shuffle
    return Object.values(poll.options).map(option => option.id);
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
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="poll-options">
          {provided => (
            <div ref={provided.innerRef}>
              <h2>Vote!</h2>
              <p>Drag the options below to match your preferred order</p>
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
                <button>Submit</button>
              </ActionFooter>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
