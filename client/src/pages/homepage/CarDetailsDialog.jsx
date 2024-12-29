import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@radix-ui/themes";
import { getFormData } from "@/lib/getFormData";
import useFormStore from "@/store/formStore";
import { useNavigate } from "react-router-dom";

const CarDetailsDialog = ({ product }) => {
  console.log(product);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]); // Track multiple selected times
  const { formData, updateFormData, getFullFormData } = useFormStore();
  const navigate = useNavigate();

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
                <RadioGroup
                  options={[
                    {
                      value: "option1",
                      label: "Option 1",
                      price: "45,00 €",
                      discountPrice: "60,00 €",
                    },
                    {
                      value: "option2",
                      label: "Option 2",
                      price: "50,00 €",
                      discountPrice: "70,00 €",
                    },
                  ]}
                  required
                />
              </FormControl>
              <FormMessage match="valueMissing" className="text-red-800">
                Please select a option
              </FormMessage>
            </FormField>

            {/* Date Field */}
            <FormField name="date">
              <FormLabel>Select Date</FormLabel>
              <FormControl asChild>
                <Input
                  type="date"
                  required
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </FormControl>
              <FormMessage match="valueMissing" className="text-red-800">
                Please select a date
              </FormMessage>
            </FormField>

            {/* Time Selection */}
            <FormField name="time">
              <FormLabel>Select Times</FormLabel>
              <div className="grid grid-cols-3 gap-2">
                {product.availableTimes.map(({ start, end, _id, disabled }) => {
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
