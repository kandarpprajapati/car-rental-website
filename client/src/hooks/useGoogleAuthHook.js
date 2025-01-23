import { useMutation } from "@tanstack/react-query";
import apiClient from "../config/apiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export function useGoogleAuthHook() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async ({ token }) => {
      // Fetch user data from Google using the access token
      const googleUserInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await googleUserInfo.json();

      const googleLoginData = await apiClient.post("/auth/google-login", {
        email: userData.email,
      });

      // Return user data for further processing
      return googleLoginData.data;
    },
    onSuccess: (data) => {
      // Save user data in localStorage
      localStorage.setItem("token", data.token);

      // Handle post-login actions
      login();

      // Redirect based on conditions
      if (JSON.parse(localStorage.getItem("booking_details"))) {
        navigate("/checkout");
      } else {
        navigate("/");
      }

      toast.success("Logged in successfully!");
    },
    onError: (error) => {
      console.error("Error during Google login:", error);
      toast.error("Google login failed. Please try again.");
    },
  });
}
