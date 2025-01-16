// apiClient.js
import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Replace with your API base URL
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your token retrieval logic

    // Check if authorization should be excluded
    if (!config.headers.excludeAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Remove the excludeAuth property from headers
    delete config.headers.excludeAuth;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem("token");
      window.location.href = "/auth"; // Replace with your login route
    }
    return Promise.reject(error);
  }
);

export default apiClient;
