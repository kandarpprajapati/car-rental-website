import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
