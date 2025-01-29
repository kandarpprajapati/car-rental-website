import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/apiClient";

export function useGetUserBookings() {
  const translationLang = localStorage.getItem("i18nextLng") || "en";
  return useQuery({
    queryKey: ["user-bookings"], // Cache key for React Query
    queryFn: async () => {
      const response = await apiClient.get(
        `/booking/userbookings?lang=${translationLang}`
      );
      console.log(response);
      return response.data.bookings; // Assuming Axios response has data in `response.data`
    },
  });
}
