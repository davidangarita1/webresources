import "./PublicLayout.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Toggle from "../../components/Toggle/Toggle";
import { useSelector } from "react-redux";
import { sidebarData } from "../../data/sidebarData";

const PublicLayout = () => {
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
export default PublicLayout;
