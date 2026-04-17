import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: "70px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;