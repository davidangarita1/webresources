import "./notFound.scss";

import { Fragment } from "react";

const NotFound = () => (
  <Fragment>
    <div id="notFound">
      <div className="container">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist. You can go back to</p>
      </div>
    </div>
  </Fragment>
);

export default NotFound;
