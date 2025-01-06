import { useMutation } from "@tanstack/react-query";
import apiClient from "../../config/apiClient";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export function useInitiatePaymentIntent() {
  const navigate = useNavigate();

  const stripePromise = loadStripe(
    "pk_test_51QVWOtP9aalJFh41vwsUux6OhkNw780bJQp6QLlzAcS1cmANheYDqwHCe3Eu7wk8ZVjr9LEJkvIVo6AhhRIbDaTK00rDjxBsWu"
  );

  return useMutation({
    mutationFn: async (totalPrice) => {
      const response = await apiClient.post(
        "http://localhost:1102/api/payments/create-checkout-session",
        totalPrice
      ); // Replace with your endpoint

      return response.data;
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        // Redirect to /auth if unauthorized
        navigate("/auth");
      } else {
        console.error("Booking failed:", error);
      }
    },
    onSuccess: async (data) => {
      console.log("Session successful:", data);

      const stripe = await stripePromise;
      try {
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) {
          console.error(result.error.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
}
