import { Fragment } from "react";
import "./Resources.scss";

import { ResourceForm } from "@Components";
import { categories } from "../../data/categoryData";

const Resources = () => {
  return (
    <Fragment>
      <div id="resources">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Resources</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ResourceForm categories={categories} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Resources;
