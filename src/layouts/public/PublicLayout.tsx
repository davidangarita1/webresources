import "./PublicLayout.css";
import { Outlet } from "react-router-dom";

import { Footer, Toggle } from "../../components";
import { useSelector } from "react-redux";

const PublicLayout = () => {
  const { isActive } = useSelector((state: any) => state.darkMode);

  return (
    <>
      <div className={isActive ? "dark-mode" : ""}>
        <div className="topbar" />
        <Toggle />
        <div className={isActive ? "scroll dark-mode" : "scroll"}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PublicLayout;
