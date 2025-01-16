import { useMutation } from "@tanstack/react-query";
import apiClient from "../../config/apiClient";
import toast from "react-hot-toast";

export function useGetProductAvailableTimes() {
  return useMutation({
    mutationFn: async ({ date, productId }) => {
      // Use apiClient for the request
      const response = await apiClient.get("/product/available-times", {
        params: {
          date,
          productId,
        },
      });

      // Return the API response data
      return response.data;
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("Something went wrong, Please try again !");
    },
  });
}
