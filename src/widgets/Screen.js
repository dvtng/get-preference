import React from "react";
import "./Screen.css";

export const Screen = ({ title, subTitle, actions, children }) => {
  return (
    <form className="Screen">
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
