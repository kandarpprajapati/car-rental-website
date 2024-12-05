import { useMutation } from "@tanstack/react-query";

export function useAuthHook() {
  return useMutation({
    mutationFn: async ({ url, data }) => {
      console.log(url, data);
      return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include", // Allows cookies or credentials
        body: JSON.stringify({
          emailOrUsername: data.email,
          password: data.password,
        }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      console.log(data);
      // toast.success(data.message)
    },
    onError: (error) => {
      console.log(error);
      // toast.error(error.message)
    },
  });
}
