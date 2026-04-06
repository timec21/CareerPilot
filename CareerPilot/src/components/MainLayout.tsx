import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet /> {/* Alt sayfalar buraya gelecek */}
    </main>
  </>
);
export default MainLayout;