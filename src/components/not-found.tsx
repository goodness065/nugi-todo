import { Link } from "react-router-dom";
import Button from "./common/button";

const NotFound = () => {
  return (
    <div>
      <div className="bg-[#f6f9ff] min-h-screen">
        <div className="pt-10 layout-container">
          <div className="flex flex-col items-center justify-center w-full h-screen space-y-2">
            <p>Looks like you got lost</p>
            <Link to="/"><Button title="Go home" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
