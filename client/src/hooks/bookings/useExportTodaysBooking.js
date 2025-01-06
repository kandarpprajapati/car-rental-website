import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../config/apiClient"; // Adjust this path to your apiClient
import toast from "react-hot-toast";

export function useExportTodayBookings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.get(
        "http://localhost:1102/api/booking/today-bookings/export",
        {
          responseType: "blob", // Important: Set the response type to blob
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.found === false) {
        toast.error(data.message);
      } else {
        // You can handle file download if data is returned
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([data], { type: "application/vnd.ms-excel" })
        );
        link.download = "today_bookings.xlsx";
        link.click();
      }

      // Optionally invalidate related queries
      queryClient.invalidateQueries("bookings"); // invalidate bookings query after export
    },
    onError: (error) => {
      console.log(error);
      console.error("Export failed:", error);
    },
  });
}
