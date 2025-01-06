import { getFormData } from "@/lib/getFormData";
import useFormStore from "@/store/formStore";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormSubmit,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useCreateBooking } from "../../hooks/bookings/useCreateBooking";
import { Text } from "@radix-ui/themes";
import { useInitiatePaymentIntent } from "../../hooks/payment/useCreatePaymentIntent";
import { useEffect, useState } from "react";

const CheckOutForm = () => {
  const { mutateAsync } = useCreateBooking();
  const { formData, updateFormData, getFullFormData } = useFormStore();
  console.log(formData);

  const [distancePrice, setDistancePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { mutateAsync: paymentInitiateMethod } = useInitiatePaymentIntent();

  // Update total price whenever price or distance price changes
  useEffect(() => {
    const basePrice = parseFloat(formData.price) || 0;
    const helperPrice = formData.helperPrice || 0;
    setTotalPrice(basePrice + distancePrice + helperPrice);
  }, [formData.price, distancePrice, formData.helperPrice]);

  const placeOrder = async (event) => {
    event.preventDefault();

    const newFormData = getFormData(event.target);

    const completeFormData = {
      ...getFullFormData(),
      ...newFormData,
      distancePrice,
      totalPrice,
    };

    updateFormData(completeFormData);

    console.log(completeFormData); // Process your form data here

    //await mutateAsync(completeFormData);

    await paymentInitiateMethod({
      totalPrice: 1,
      bookingDetails: completeFormData,
    });
  };

  return (
    <div className="w-full py-10 flex justify-center items-center">
      <div className="w-[90%] max-w-[600px] bg-background shadow-xl rounded-lg p-6 flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-primary-foreground mb-4">
          Checkout
        </h1>
        {/* <p className="text-sm text-gray-500 mb-6">Pnix.fi</p> */}
        <Form className="w-full" onSubmit={placeOrder}>
          {/* Customer Phone */}
          <FormField name="phone">
            <FormLabel>Customer *</FormLabel>
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
                  placeholder="Phone number"
                  required
                  className="flex-1"
                />
              </FormControl>
            </div>
          </FormField>

          {/* Delivery From */}
          <FormField name="deliveryFrom" className="mt-4">
            <FormLabel>Delivery From *</FormLabel>
            <FormControl asChild>
              <Input type="text" placeholder="Your answer" required />
            </FormControl>
          </FormField>

          {/* Delivery To */}
          <FormField name="deliveryTo" className="mt-4">
            <FormLabel>Delivery To *</FormLabel>
            <FormControl asChild>
              <Input type="text" placeholder="Your answer" required />
            </FormControl>
          </FormField>

          {/* Order Summary */}
          <div className="mt-6 bg-gray-100 rounded-lg">
            <h2 className="text-primary-foreground font-bold">Order Summary</h2>
            <div className="text-sm text-gray-600 mt-2">
              <FormField className="flex justify-between" name="vanPrice">
                <span>Van Charges</span>
                <FormControl asChild>
                  <Text>{(parseFloat(formData.price) || 0).toFixed(2)}</Text>
                </FormControl>
              </FormField>
              {formData.helper && (
                <FormField className="flex justify-between" name="helperPrice">
                  <span>Helper Charges</span>
                  <FormControl asChild>
                    <Text>{(formData.helperPrice || 0).toFixed(2)}</Text>
                  </FormControl>
                </FormField>
              )}
              <FormField className="flex justify-between" name="distancePrice">
                <span>Distance Charges</span>
                <FormControl asChild>
                  <Text>{distancePrice.toFixed(2)}</Text>
                </FormControl>
              </FormField>
              <hr className="my-2" />
              <FormField
                className="flex justify-between font-bold text-primary-foreground"
                name="totalPrice"
              >
                <span>Total (estimated)</span>
                <FormControl asChild>
                  <Text>{parseFloat(totalPrice).toFixed(2)}</Text>
                </FormControl>
              </FormField>
            </div>
          </div>
          <FormSubmit asChild>
            <Button variant="secondary">Place Order</Button>
          </FormSubmit>
        </Form>
      </div>
    </div>
  );
};

export default CheckOutForm;
