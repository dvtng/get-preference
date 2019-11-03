import React from "react";
import { Tag } from "../widgets/Tag";
import "./PollOption.css";

export const PollOption = ({ label, points }) => {
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
