// hooks/useFetchProducts.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useProductStore from "../../store/productStore";
import toast from "react-hot-toast";

export function useGetProductsByCategory() {
  const setProducts = useProductStore((state) => state.setProducts);

  return useMutation({
    mutationFn: async (category) => {
      const response = await axios.get("http://localhost:1102/api/product", {
        params: { category },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setProducts(data.products); // Update Zustand store with fetched products
      console.log("Fetched products:", data);
    },
    onError: (error) => {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products. Please try again !");
    },
  });
}
