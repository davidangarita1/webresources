import "./PrivateLayout.css";
import { Outlet } from "react-router-dom";
import { Navbar, Footer, Toggle } from "../../components";
import { useSelector } from "react-redux";
import { sidebarData } from "../../data/sidebarData";

const PrivateLayout = () => {
  const { isActive } = useSelector((state: any) => state.darkMode);

  return (
    <>
      <div className={isActive ? "dark-mode" : ""}>
        <Navbar data={sidebarData} />
        <Toggle />
        <div className={isActive ? "scroll dark-mode" : "scroll"}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PrivateLayout;
