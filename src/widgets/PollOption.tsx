import React, { ReactNode } from "react";
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
  right?: ReactNode;
  progress?: number;
};

export const PollOption = ({
  label,
  draggable,
  right,
  progress
}: PollOptionProps) => {
  const backgroundStyle =
    progress != null
      ? {
          background: "#4d7cba",
          width: `${progress * 100}%`,
          opacity: progress * 0.8 + 0.2
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
        {right}
      </div>
    </div>
  );
};
