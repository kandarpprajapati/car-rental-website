import { create } from "zustand";

// Zustand store for form management
const useFormStore = create((set, get) => ({
  formData: {}, // Initial form data object

  // Update form data with new values
  updateFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  // Reset form data
  resetFormData: () => set({ formData: {} }),

  // Get the current form data
  getFullFormData: () => get().formData,
}));

export default useFormStore;
