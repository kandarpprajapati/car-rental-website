// hooks/useFetchProducts.js
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../../config/apiClient";
import useProductStore from "../../store/productStore";

export function useGetProductsByCategory() {
  const setProducts = useProductStore((state) => state.setProducts);
  const translationLang = localStorage.getItem("i18nextLng") || "en";

  return useMutation({
    mutationFn: async (category) => {
      const response = await apiClient.get(`/product?lang=${translationLang}`, {
        params: { category },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setProducts(data.products); // Update Zustand store with fetched products
    },
    onError: (error) => {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products. Please try again !");
    },
  });
}
