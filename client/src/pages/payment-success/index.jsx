import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../config/apiClient";

export function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      // Call your backend to fetch the session details and confirm the booking
      apiClient
        .get(
          `http://localhost:1102/api/payments/confirm-payment?session_id=${sessionId}`
        )
        .then((response) => {
          // If the payment is successful, navigate to booking confirmation page
          console.log("Payment confirmed:", response.data);
          navigate("/booking-confirmation"); // Redirect to confirmation page
        })
        .catch((error) => {
          console.error("Error confirming payment:", error);
          // Handle error (e.g., payment failed)
        });
    }
  }, [location, navigate]);

  return <div>Processing your payment...</div>;
}
