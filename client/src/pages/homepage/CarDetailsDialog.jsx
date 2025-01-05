import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { TextArea } from "@/components/ui/textarea";
import { getFormData } from "@/lib/getFormData";
import useFormStore from "@/store/formStore";
import { Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductAvailableTimes } from "../../hooks/products/useGetProductAvailableTimes";

const CarDetailsDialog = ({ product }) => {
  console.log(product);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]); // Track multiple selected times
  const [availableTimes, setAvailableTimes] = useState(
    product.availableTimes || []
  );
  const { formData, updateFormData, getFullFormData } = useFormStore();
  const navigate = useNavigate();

  const { mutateAsync } = useGetProductAvailableTimes();

  // Handle time selection
  const handleTimeSelection = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = getFormData(event.target);

    formData.helper = formData.helper === "on" ? true : false;

    // Add selected times to the form data
    const updatedFormData = {
      ...formData,
      productId: product._id,
      time: selectedTimes, // Include the selected times
    };

    console.log(updatedFormData);

    updateFormData(updatedFormData);

    navigate("/checkout");
  };

  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleDateChange = (e) => {
    e.preventDefault();

    mutateAsync(
      { date: e.target.value, productId: product._id },
      {
        onSuccess: (data) => {
          setSelectedDate(e.target.value);
          setAvailableTimes(data.availableTimes);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="rounded-full" size="sm">
          + Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto scrollbar">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground">
            Car Details
          </DialogTitle>
          <p>{product.name}</p>
        </DialogHeader>
        <Form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Product Image */}
            <div className="flex flex-col items-center">
              <img src={product.imageUrl} alt="Car" />
            </div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            {/* Description with "Read More" */}
            <p className="text-gray-600 text-justify">
              {isExpanded
                ? product.description
                : truncateDescription(product.description, 20)}
              <button
                type="button"
                className="text-primary-foreground font-semibold hover:underline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            </p>

            <FormField name="options">
              <FormControl asChild>
                <RadioGroup options={product.pricePerHour} required />
              </FormControl>
              <FormMessage match="valueMissing" className="text-red-800">
                Please select a option
              </FormMessage>
            </FormField>

            {/* Date Field */}
            <FormField name="date">
              <FormLabel>Select Date</FormLabel>
              <FormControl asChild>
                <Input type="date" required onChange={handleDateChange} />
              </FormControl>
              <FormMessage match="valueMissing" className="text-red-800">
                Please select a date
              </FormMessage>
            </FormField>

            {/* Time Selection */}
            <FormField name="time">
              <FormLabel>Select Times</FormLabel>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map(({ start, end, _id, disabled }) => {
                  const value = `${start}-${end}`;

                  return (
                    <div key={_id}>
                      <label
                        className={`flex flex-col items-center border p-2 rounded-lg cursor-pointer ${
                          disabled
                            ? "bg-gray text-white cursor-not-allowed"
                            : selectedTimes.includes(value)
                            ? "bg-secondary-foreground border-secondary text-white" // Highlight selected
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          value={value}
                          disabled={disabled}
                          onChange={() => handleTimeSelection(value)}
                          checked={selectedTimes.includes(value)}
                        />
                        <Text weight="bold">
                          {start}-{end} {parseInt(start, 10) < 12 ? "AM" : "PM"}
                        </Text>
                      </label>
                    </div>
                  );
                })}
              </div>
            </FormField>

            {/* Helper Checkbox */}
            <FormField name="helper">
              <FormControl asChild>
                <Checkbox
                  label="Extra Helper"
                  price="+ 20,00 €"
                  onCheckedChange={(value) =>
                    updateFormData({ helper: value === true })
                  }
                />
              </FormControl>
            </FormField>

            {/* Special Requirements */}
            <FormField name="specialRequirements">
              <FormLabel>Special Requirements</FormLabel>
              <FormControl asChild>
                <TextArea placeholder="Enter special requirements…" />
              </FormControl>
            </FormField>
          </div>

          <DialogFooter>
            <FormSubmit asChild>
              <Button type="submit" variant="default">
                Book this car
              </Button>
            </FormSubmit>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsDialog;
