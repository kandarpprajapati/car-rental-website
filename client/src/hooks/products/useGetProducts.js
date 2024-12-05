import { useQuery } from "@tanstack/react-query";

export function useGetProducts() {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      return await fetch("http://localhost:1102/api/product").then((res) =>
        res.json()
      );
    },
  });
}
