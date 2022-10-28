import { Fragment } from "react";
import "./Footer.scss";

export const Footer = (): JSX.Element => (
  <Fragment>
    <div className="footerPage">
      &copy; {new Date().getFullYear()} Copyright:{" "}
      <a href="https://www.dangwebs.com" target="_blank">
        DangWebs.com
      </a>
    </div>
  </Fragment>
);
