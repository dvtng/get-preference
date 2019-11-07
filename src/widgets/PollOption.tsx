import React from "react";
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
  maxPoints?: number;
};

export const PollOption = ({
  label,
  draggable,
  points,
  maxPoints
}: PollOptionProps) => {
  const backgroundStyle =
    points != null && maxPoints
      ? {
          background: "#4d7cba",
          width: `${(points / maxPoints) * 100}%`,
          opacity: (points / maxPoints) * 0.8 + 0.2
        }
      : undefined;

  return (
    <div className="PollOption">
      <div className="PollOption-background" style={backgroundStyle}></div>
      <div className="PollOption-inner">
        <div className="PollOption-label">
          {draggable && <DragHandle />}
          {label}
        </div>
        {points ? (
          <div className="PollOption-points">
            {points} point{points > 1 ? "s" : ""}
          </div>
        ) : null}
      </div>
    </div>
  );
};
