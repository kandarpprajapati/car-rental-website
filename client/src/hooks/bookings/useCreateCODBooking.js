import { useMutation } from "@tanstack/react-query";
import apiClient from "../../config/apiClient";
import useFormStore from "../../store/formStore";
import toast from "react-hot-toast";

export function useCreateCODBooking() {
  const { resetFormData } = useFormStore();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.post(
        "/booking/create-cod-booking",
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
      toast.success(data.message);
      resetFormData();
      // You can add any side effects here, like navigating to another page
    },
  });
}
