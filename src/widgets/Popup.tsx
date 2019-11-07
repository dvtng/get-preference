import React, { FC, ReactNode } from "react";
import "./Popup.css";

export type PopupProps = {
  isOpen?: boolean;
  actions: ReactNode;
};

export const Popup: FC<PopupProps> = ({ isOpen, actions, children }) => {
  return (
    <div className={["Popup", isOpen ? "open" : null].join(" ")}>
      <div className="Popup-contents">
        <div className="Popup-main">{children}</div>
        <div className="Popup-footer">{actions}</div>
      </div>
    </div>
  );
};
