import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function MainLayout() {
  const location = useLocation();
  const hideHeaderFooter = ["/auth"].includes(location.pathname); // Pages to hide navbar and footer

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default MainLayout;
