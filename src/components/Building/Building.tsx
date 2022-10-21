import "./Building.css";
import React, { Fragment } from "react";
import * as Md from "react-icons/md";

const BuildingPage = ({ title }: { title: string }) => {
  return (
    <Fragment>
      <div id="building">
        <div className="container">
          <h1>{title}</h1>
          <p>
            This is a building page. It is a place where you can see the
            building.
          </p>
          <Md.MdOutlineBuild />
        </div>
      </div>
    </Fragment>
  );
};

export default BuildingPage;
