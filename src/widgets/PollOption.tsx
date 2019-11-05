import React from "react";
import { Tag } from "./Tag";
import "./PollOption.css";

export type PollOptionProps = {
  label: string;
  points?: number;
};

export const PollOption = ({ label, points }: PollOptionProps) => {
  return (
    <div className="PollOption">
      <div className="PollOption-inner">
        {label}
        {points ? (
          <Tag>
            {points} point{points > 1 ? "s" : ""}
          </Tag>
        ) : null}
      </div>
    </div>
  );
};
