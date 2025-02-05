import { getFormData } from "@/lib/getFormData";
import useFormStore from "@/store/formStore";
import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormSubmit,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useInitiatePaymentIntent } from "../../hooks/payment/useCreatePaymentIntent";
import { Button } from "../../components/ui/button";
import PlaceOrderAlertDialog from "./PlaceOrderAlertDialog";
import { useCreateCODBooking } from "../../hooks/bookings/useCreateCODBooking";

const CheckOutForm = () => {
  const { formData, updateFormData, getFullFormData } = useFormStore();

  const [distancePrice, setDistancePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state
  const [openAlert, setOpenAlert] = useState(false);

  const { mutateAsync: createCODBooking } = useCreateCODBooking();

  const { mutateAsync: paymentInitiateMethod } = useInitiatePaymentIntent();
  const { t, i18n } = useTranslation("translation");

  useEffect(() => {
    const booking_details = localStorage.getItem("booking_details")
      ? JSON.parse(localStorage.getItem("booking_details"))
      : null;
    if (booking_details) {
      updateFormData(booking_details);
      localStorage.removeItem("booking_details");
    }
  }, []);

  // Update total price whenever price or distance price changes
  useEffect(() => {
    const basePrice = parseFloat(formData.price) || 0;
    const helperPrice = formData.helperPrice || 0;
    setTotalPrice(basePrice + distancePrice + helperPrice);
  }, [formData.price, distancePrice, formData.helperPrice]);

  // ✅ Step 1: Open the Alert Instead of Submitting Form Directly
  const handleOpenAlert = (event) => {
    event.preventDefault(); // Prevent default form submission

    const newFormData = getFormData(event.currentTarget.form);
    const updatedDataForm = {
      ...getFullFormData(),
      ...newFormData,
      distancePrice,
      totalPrice,
    };

    updateFormData(updatedDataForm);

    setOpenAlert(true); // Open the alert dialog
  };

  const placeOrder = async (paymentMethod) => {
    setLoading(true); // Set loading state to true

    try {
      const formElement = document.querySelector("form");
      const newFormData = getFormData(formElement);

      const completeFormData = {
        ...getFullFormData(),
        ...newFormData,
        distancePrice,
        totalPrice,
      };

      updateFormData(completeFormData);

      localStorage.setItem(
        "booking_details",
        JSON.stringify({ ...completeFormData, time_checkout: new Date() })
      );

      if (paymentMethod === "cod") {
        await createCODBooking(completeFormData);
        return;
      }

      await paymentInitiateMethod({
        totalPrice,
        bookingDetails: completeFormData,
      });
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full py-10 flex justify-center items-center">
      <div className="w-[90%] max-w-[600px] bg-background shadow-xl rounded-lg p-6 flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-primary-foreground mb-4">
          {t("checkout.heading")}
        </h1>
        {/* <p className="text-sm text-gray-500 mb-6">Pnix.fi</p> */}
        <Form className="w-full">
          {/* Customer Phone */}
          <FormField name="phone">
            <FormLabel>{t("checkout.customer")} *</FormLabel>
            <div className="flex items-center space-x-2">
              <FormControl asChild>
                <select
                  className="border border-input rounded-md p-2"
                  required
                  name="phonecode"
                >
                  <option>+358</option>
                  <option>+91</option>
                  <option>+1</option>
                </select>
              </FormControl>
              <FormControl asChild>
                <Input
                  type="number"
                  placeholder={t("checkout.phoneNo")}
                  required
                  className="flex-1"
                  defaultValue={formData.phone}
                />
              </FormControl>
            </div>
          </FormField>

          {/* Delivery From */}
          <FormField name="deliveryFrom" className="mt-4">
            <FormLabel>{t("checkout.deliveryFrom")} *</FormLabel>
            <FormControl asChild>
              <Input
                type="text"
                placeholder={t("checkout.yourAnswer")}
                required
                defaultValue={formData.deliveryFrom}
              />
            </FormControl>
          </FormField>

          {/* Delivery To */}
          <FormField name="deliveryTo" className="mt-4">
            <FormLabel>{t("checkout.deliveryTo")} *</FormLabel>
            <FormControl asChild>
              <Input
                type="text"
                placeholder={t("checkout.yourAnswer")}
                required
                defaultValue={formData.deliveryTo}
              />
            </FormControl>
          </FormField>

          {/* Order Summary */}
          <div className="mt-6 bg-gray-100 rounded-lg">
            <h2 className="text-primary-foreground font-bold">
              {t("checkout.orderSummary.heading")}
            </h2>
            <div className="text-sm text-gray-600 mt-2">
              <FormField className="flex justify-between" name="vanPrice">
                <span>{t("checkout.orderSummary.vanCharge")}</span>
                <FormControl asChild>
                  <Text>{(parseFloat(formData.price) || 0).toFixed(2)} €</Text>
                </FormControl>
              </FormField>
              {formData.helper && (
                <FormField className="flex justify-between" name="helperPrice">
                  <span>{t("checkout.orderSummary.helperCharge")}</span>
                  <FormControl asChild>
                    <Text>{(formData.helperPrice || 0).toFixed(2)} €</Text>
                  </FormControl>
                </FormField>
              )}
              <FormField className="flex justify-between" name="distancePrice">
                <span>{t("checkout.orderSummary.distanceCharge")}</span>
                <FormControl asChild>
                  <Text>{distancePrice.toFixed(2)} €</Text>
                </FormControl>
              </FormField>
              <hr className="my-2" />
              <FormField
                className="flex justify-between font-bold text-primary-foreground"
                name="totalPrice"
              >
                <span>{t("checkout.orderSummary.total")}</span>
                <FormControl asChild>
                  <Text>{parseFloat(totalPrice).toFixed(2)} €</Text>
                </FormControl>
              </FormField>
            </div>
          </div>
          <FormSubmit asChild>
            <Button
              variant="secondary"
              loading={loading}
              onClick={handleOpenAlert}
            >
              {loading ? t("checkout.orderPlacing") : t("checkout.button")}
            </Button>
          </FormSubmit>
        </Form>

        {/* Place Order Alert Dialog */}
        <PlaceOrderAlertDialog
          open={openAlert}
          setOpen={setOpenAlert}
          placeOrder={placeOrder}
        />
      </div>
    </div>
  );
};

export default CheckOutForm;
