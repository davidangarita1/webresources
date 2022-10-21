import "./toggle.css";
import { useDispatch, useSelector } from "react-redux";
import Sun from "../../assets/sun.png";
import Moon from "../../assets/moon.png";
import { handleToggle } from "../../redux/middlewares/darkModeMiddleware";

const Toggle = () => {
  const dispatch = useDispatch();
  const { isActive } = useSelector((state: any) => state.darkMode);

  const handleClick = () => {
    dispatch(handleToggle());
  };

  return (
    <>
      <div className="toggle">
        <img src={Sun} alt="" className="toggle-icon" />
        <img src={Moon} alt="" className="toggle-icon" />
        <div
          className="toggle-button"
          onClick={handleClick}
          style={{ left: isActive ? 0 : 25 }}
        />
      </div>
    </>
  );
};

export default Toggle;
