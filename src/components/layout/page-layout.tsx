import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div>
      <Navbar />
        <div className="bg-[#f6f9ff] pt-[70px] min-h-screen">
        <div className="pt-10 layout-container">
          <Outlet />
        </div>
        </div>
    </div>
  );
};

export default PageLayout;
