import "./PublicLayout.scss";

import { Outlet } from "react-router-dom";

import { Footer, Toggle } from "@components";
import { useDarkMode } from "../../context/DarkModeContext";

const PublicLayout = () => {
  const { isActive } = useDarkMode();

  return (
    <>
      <div>
        <div className={`topbar ${isActive ? "dark-mode" : ""}`} />
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
