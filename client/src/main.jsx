import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";
import AuthForm from "./pages/auth/AuthForm.jsx";
import CheckOutForm from "./pages/checkoutform/index.jsx";
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
        path: "auth",
        element: <AuthForm />, // Child layout (e.g., Homepage)
      },
      {
        path: "checkout",
        element: <CheckOutForm />, // Another child route
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
