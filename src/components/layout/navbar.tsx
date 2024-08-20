import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="layout-container border-b border-[#eee] ">
      <div className="w-full flex justify-between items-center py-8">
        <Link to="/"><p className="font-bold text-2xl">MYTODO</p></Link>
        <ul className="flex gap-5 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-textPrimary" : "")}
            >
              All todos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/active"
              className={({ isActive }) => (isActive ? "text-textPrimary" : "")}
            >
              Active todos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/completed"
              className={({ isActive }) => (isActive ? "text-textPrimary" : "")}
            >
              Completed todos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
