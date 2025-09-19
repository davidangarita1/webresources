import "./Footer.scss";

import { Fragment } from "react";
import { useDarkMode } from "../../context/DarkModeContext";

const DEFAULT_URL = "https://www.dangwebs.com";

export const Footer = () => {
  const { isActive } = useDarkMode();

  return (
    <Fragment>
      <div className={`footerPage ${isActive ? "dark-mode" : ""}`}>
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a href={DEFAULT_URL} target="_blank">
          DangWebs.com
        </a>
      </div>
    </Fragment>
  );
};
