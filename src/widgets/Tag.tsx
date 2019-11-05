import React, { FC } from "react";
import "./Tag.css";

export const Tag: FC = ({ children }) => {
  return <span className="Tag">{children}</span>;
};
