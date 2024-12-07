import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./providers/AuthProvider";

function MainLayout() {
  const location = useLocation();
  const hideHeaderFooter = ["/auth"].includes(location.pathname); // Pages to hide navbar and footer

  return (
    <AuthProvider>
      {!hideHeaderFooter && <Navbar />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </AuthProvider>
  );
}

export default MainLayout;
