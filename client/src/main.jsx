import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomepageLayout from "./pages/homepage/HomepageLayout.jsx";
import MainLayout from "./MainLayout.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main Layout as the parent
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <HomepageLayout />, // Child layout (e.g., Homepage)
      },
      {
        path: "about",
        element: <div>About Us Content</div>, // Another child route
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
