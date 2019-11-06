import React from "react";
import { Tag } from "./Tag";
import "./PollOption.css";

const DragHandle = () => (
  <svg className="DragHandle" viewBox="0 0 30 40">
    <circle cx="10" cy="10" r="3" />
    <circle cx="20" cy="10" r="3" />
    <circle cx="10" cy="20" r="3" />
    <circle cx="20" cy="20" r="3" />
    <circle cx="10" cy="30" r="3" />
    <circle cx="20" cy="30" r="3" />
  </svg>
);

export type PollOptionProps = {
  label: string;
  draggable?: boolean;
  points?: number;
};

export const PollOption = ({ label, draggable, points }: PollOptionProps) => {
  return (
    <div className="PollOption">
      <div className="PollOption-inner">
        {draggable && (
          <div className="PollOption-dragHandleContainer">
            <DragHandle />
          </div>
        )}
        {label}
        {points ? (
          <div className="PollOption-points">
            <Tag>
              {points} point{points > 1 ? "s" : ""}
            </Tag>
          </div>
        ) : null}
      </div>
    </div>
  );
};
