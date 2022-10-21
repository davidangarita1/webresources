import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";

export const sidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Ai.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Resources",
    path: "/resources",
    icon: <Fa.FaBuffer />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <Fa.FaUserAstronaut />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <Fa.FaSuitcase />,
    cName: "nav-text",
  },
];
