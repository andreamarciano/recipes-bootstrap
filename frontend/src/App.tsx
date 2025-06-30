import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="container text-center mt-5">
        <Outlet />
      </main>
    </>
  );
}

export default App;
