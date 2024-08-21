import Navbar from "../components/layout/navbar";

const NotFound = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <div className="bg-[#f6f9ff] pt-[70px] min-h-screen">
        <div className="layout-container pt-10">
          <div className="h-[calc(100vh-10px)] w-full flex justify-center items-center">
            <p>Looks like you got lost</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
