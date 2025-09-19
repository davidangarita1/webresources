import "./toggle.scss";
import Sun from "@assets/sun.png";
import Moon from "@assets/moon.png";

import { Fragment } from "react";
import { useDarkMode } from "../../context/DarkModeContext";

export const Toggle = () => {
  const { isActive, toggle } = useDarkMode();

  const handleClick = (): void => {
    toggle();
  };

  return (
    <Fragment>
      <div className="toggle">
        <img src={Sun} alt="" className="toggle-icon" />
        <img src={Moon} alt="" className="toggle-icon" />
        <div
          className="toggle-button"
          onClick={handleClick}
          style={{ left: isActive ? 0 : 25 }}
        />
      </div>
    </Fragment>
  );
};
