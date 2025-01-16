import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../config/apiClient";
import toast from "react-hot-toast";
import useFormStore from "../../store/formStore";
import LoadingComponent from "../../components/ui/loading-component";

export function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { resetFormData } = useFormStore();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      // Call your backend to fetch the session details and confirm the booking
      apiClient
        .get(`/payments/confirm-payment?session_id=${sessionId}`)
        .then((response) => {
          // If the payment is successful, navigate to booking confirmation page
          resetFormData();
          toast.success(response.data.message);
          navigate("/"); // Redirect to confirmation page
        })
        .catch((error) => {
          console.error("Error confirming payment:", error);
          // Handle error (e.g., payment failed)
        });
    }
  }, [location, navigate]);

  return (
    <>
      <LoadingComponent text="Processing your payment..." />
    </>
  );
}
