import { create } from "zustand";
import { getUser } from "../utils/auth";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: getUser(),
  isAuthenticated: Boolean(getUser()),
  title: Boolean(localStorage.getItem("token")) ? "Logout" : "Login",

  login: () => {
    set({ isAuthenticated: true, title: "Logout" });
  },

  logout: () => {
    localStorage.removeItem("token"); // Optional: clear token
    set({ isAuthenticated: false, title: "Login" });
    toast.success("Logout Successful");
  },
}));

export default useAuthStore;
