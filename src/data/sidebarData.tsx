import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";
import * as Md from "react-icons/md";

export const sidebarData = [
  {
    title: "Dashboard",
    path: "/admin",
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
    icon: <Md.MdLogout />,
    cName: "nav-text",
  },
];
