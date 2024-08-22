import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogoIcon } from "../icons/logo.icon";

import Logo from "../../assets/icon/syncventory-logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../app/auth/slice/auth-slice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login");
  }

  return (
    <section className="bg-white fixed w-full h-[70px] z-[100000]">
      <nav className="layout-container border-b border-stroke h-[70px] ">
        <div className="flex items-center justify-between w-full py-6">
          <Link to="/">
            {" "}
            <img src={Logo} alt="logo" className="hidden sm:flex" />
            <div className="flex sm:hidden">
              <LogoIcon />
            </div>
          </Link>
          {location.pathname !== "/login" && (
            <ul className="flex items-center gap-3 sm:gap-5">
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
              <li><button onClick={() => handleLogout()} className="text-sm sm:text-base text-textblack">logout</button></li>
            </ul>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;