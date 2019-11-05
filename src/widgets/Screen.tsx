import React, { ReactNode, FC } from "react";
import "./Screen.css";

export type ScreenProps = {
  title?: string;
  subTitle?: string;
  actions?: ReactNode | ReactNode[];
};

export const Screen: FC<ScreenProps> = ({
  title,
  subTitle,
  actions,
  children
}) => {
  return (
    <form
      className="Screen"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <header className="Screen-header">
        <h1>Get Preference</h1>
      </header>
      <div className="Screen-main">
        {title && <h2>{title}</h2>}
        {subTitle && <h3>{subTitle}</h3>}
        {children}
      </div>
      <footer className="Screen-footer">{actions}</footer>
    </form>
  );
};
