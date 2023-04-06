import "./Footer.scss";

import { Fragment } from "react";
import { useSelector } from "react-redux";

const DEFAULT_URL = "https://www.dangwebs.com";

export const Footer = (): JSX.Element => {
  const { isActive } = useSelector((state: any) => state.darkMode);

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
