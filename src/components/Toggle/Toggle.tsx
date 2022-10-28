import "./toggle.scss";
import Sun from "@assets/sun.png";
import Moon from "@assets/moon.png";

import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleToggle } from "../../redux/middlewares/darkModeMiddleware";

export const Toggle = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isActive } = useSelector((state: any) => state.darkMode);

  const handleClick = (): void => {
    dispatch(handleToggle());
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
