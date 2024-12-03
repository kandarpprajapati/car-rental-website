export const getFormData = (form) => {
  const formData = new FormData(form);

  // Convert FormData to an object (optional)
  const data = Object.fromEntries(formData);

  return data;
};
