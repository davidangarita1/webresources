import "./PublicLayout.scss";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Footer, Toggle } from "@Components";

const PublicLayout = () => {
  const { isActive } = useSelector((state: any) => state.darkMode);

  return (
    <>
      <div className={isActive ? "dark-mode" : ""}>
        <div className="topbar" />
        <Toggle />
        <div className={`scroll ${isActive && "dark-mode"}`}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PublicLayout;
