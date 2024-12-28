import { useMutation } from "@tanstack/react-query";
import apiClient from "../config/apiClient";
import toast from "react-hot-toast";

// export function useAuthHook() {
//   return useMutation({
//     mutationFn: async ({ url, data }) => {
//       console.log(url, data);
//       return await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         // credentials: "include", // Allows cookies or credentials
//         body: JSON.stringify({
//           emailOrUsername: data.email,
//           password: data.password,
//         }),
//       }).then((res) => res.json());
//     },
//     onSuccess: (data) => {
//       console.log(data);
//       // toast.success(data.message)
//     },
//     onError: (error) => {
//       console.log(error);
//       // toast.error(error.message)
//     },
//   });
// }

export function useAuthHook() {
  return useMutation({
    mutationFn: async ({ url, data }) => {
      console.log("Calling:", url, "with data:", data);

      // Use apiClient for the request
      const response = await apiClient.post(url, data);

      // Return the API response data
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Success:", data);
      toast.success(data.message);
      // Optionally save token or handle success
      if (data.token) {
        localStorage.setItem("token", data.token); // Save the token locally
      }
      // toast.success(data.message); // Uncomment if you have a toast library
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("Something went wrong, Please try again !");
      // toast.error(error.message); // Uncomment if you have a toast library
    },
  });
}
