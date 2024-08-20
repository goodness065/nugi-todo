import { useEffect, useState } from "react";
import "./styles/global.css";

function App() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const v = () =>
      fetch("/api/todos")
        .then((response) => response.json())
        .then((data) => setRes(data))
        .catch((error) => console.error(error));

    v();
  }, []);

  console.log(res);
  return (
    <>
      <div>
        <p className="text-blue-700 font-black text-2xl">hello</p>
      </div>
    </>
  );
}

export default App;
