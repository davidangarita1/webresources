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
    path: "/admin/resources",
    icon: <Fa.FaBuffer />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: <Fa.FaUserAstronaut />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/admin/logout",
    icon: <Fa.FaSuitcase />,
    cName: "nav-text",
  },
];
