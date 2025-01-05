// store/productStore.js
import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [], // State to hold fetched products
  setProducts: (newProducts) => set({ products: newProducts }), // Action to update products
}));

export default useProductStore;
