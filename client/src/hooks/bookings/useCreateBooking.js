import { useMutation } from "@tanstack/react-query";
import apiClient from "../../config/apiClient";

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.post(
        "http://localhost:1102/api/booking/create",
        data
      ); // Replace with your endpoint
      return response.data;
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        // Redirect to /auth if unauthorized
        window.location.href = "/auth";
      } else {
        console.error("Booking failed:", error);
      }
    },
    onSuccess: (data) => {
      console.log("Booking successful:", data);
      // You can add any side effects here, like navigating to another page
    },
  });
}
