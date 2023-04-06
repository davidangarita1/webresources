import "./PublicLayout.scss";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Footer, Toggle } from "@components";

const PublicLayout = () => {
  const { isActive } = useSelector((state: any) => state.darkMode);

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
