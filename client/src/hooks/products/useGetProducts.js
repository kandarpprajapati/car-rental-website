import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/apiClient";

// export function useGetProducts() {
//   return useQuery({
//     queryKey: ["all-products"],
//     queryFn: async () => {
//       return await fetch("http://localhost:1102/api/product").then((res) =>
//         res.json()
//       );
//     },
//   });
// }

export function useGetProducts() {
  return useQuery({
    queryKey: ["all-products"], // Cache key for React Query
    queryFn: async () => {
      const response = await apiClient.get("/product", {
        headers: {
          excludeAuth: true, // Prevent Authorization header for this request
        },
      });
      return response.data; // Assuming Axios response has data in `response.data`
    },
  });
}
