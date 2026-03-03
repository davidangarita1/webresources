import './Navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import type { ReactNode } from 'react';

export interface NavItem {
  title: string;
  path: string;
  icon: ReactNode;
  cName: string;
}

interface NavbarProps {
  data: NavItem[];
}

export const Navbar = ({ data }: NavbarProps) => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = (): void => setSidebar((prev) => !prev);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className="navbar">
        <Link to="#" className="menu-bars" aria-label="Open menu">
          <FaIcons.FaBars onClick={toggleSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} aria-hidden={!sidebar}>
        <ul className="nav-menu-items" onClick={toggleSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars" aria-label="Close menu">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {data.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </IconContext.Provider>
  );
};
