import { Link, NavLink } from "react-router-dom";
import { LogoIcon } from "../icons/logo.icon";

import Logo from "../../assets/icon/syncventory-logo.svg";

const Navbar = () => {
  return (
    <section className="bg-white fixed w-full h-[70px] z-[100000]">
      <nav className="layout-container border-b border-stroke h-[70px] ">
      <div className="w-full flex justify-between items-center py-6">
        <Link to="/">
          {" "}
          <img src={Logo} alt="logo" className="sm:flex hidden" />
          <div className="sm:hidden flex">
            <LogoIcon />
          </div>
        </Link>
        <ul className="flex gap-5 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-brandBlue text-sm sm:text-base"
                  : "text-sm sm:text-base text-textblack"
              }
            >
              All todos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/active"
              className={({ isActive }) =>
                isActive
                  ? "text-brandBlue text-sm sm:text-base"
                  : " text-sm sm:text-base text-textblack"
              }
            >
              Active todos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                isActive
                  ? "text-brandBlue text-sm sm:text-base"
                  : " text-sm sm:text-base text-textblack"
              }
            >
              Completed todos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    </section>
  );
};

export default Navbar;
