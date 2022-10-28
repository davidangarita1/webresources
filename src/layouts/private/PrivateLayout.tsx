import "./PrivateLayout.scss";
import { Outlet } from "react-router-dom";
import { Navbar, Footer, Toggle } from "@Components";
import { useSelector } from "react-redux";
import { sidebarData } from "../../data/sidebarData";

const PrivateLayout = () => {
  const { isActive } = useSelector((state: any) => state.darkMode);

  return (
    <>
      <div className={isActive ? "dark-mode" : ""}>
        <Navbar data={sidebarData} />
        <Toggle />
        <div className={`scroll ${isActive && "dark-mode"}`}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PrivateLayout;
