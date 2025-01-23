// Example: useAuth.js
import { useNavigate } from "react-router-dom";

const useHandleAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, title, logout } = useAuthStore();

  const handleAction = () => {
    if (isAuthenticated) {
      logout(); // Call logout function
      navigate("/"); // Redirect to homepage
    } else {
      navigate("/auth"); // Redirect to login page
    }
  };

  return { isAuthenticated, title, handleAction };
};

export default useHandleAuth;
