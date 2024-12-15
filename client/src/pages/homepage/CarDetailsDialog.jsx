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
import { RadioCard, RadioCardItem } from "@/components/ui/radiocards";
import { Checkbox } from "@/components/ui/checkbox";
import { Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { getFormData } from "@/lib/getFormData";

const CarDetailsDialog = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  console.log(product);

  const isTimeOccupied = (start, end, date) => {
    return product.occupiedTimes.some(
      (time) => time.date === date && time.start === start && time.end === end
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = getFormData(event.target);

    console.log(formData);

    // Add booking API call here
  };

  // Truncate description to a specific word limit
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
            <p className="text-gray-600">
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

            {/* <FormField> */}
            {/* <label className="text-sm font-medium text-gray-700">
              Choose an option:
            </label> */}
            <RadioGroup
              name="options"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
              ]}
            />
            {/* </FormField> */}

            {/* Date Field */}
            <FormField name="date">
              <FormLabel>Select Date</FormLabel>
              <FormControl asChild>
                <Input type="date" required />
              </FormControl>
              <FormMessage match="valueMissing" className="text-red-800">
                Please select a date
              </FormMessage>
            </FormField>

            {/* Time Selection */}
            <FormField name="time">
              <FormLabel>Select Time</FormLabel>
              <RadioCard
                name="time"
                defaultValue=""
                columns={{ initial: "1", sm: "3" }}
              >
                {product.availableTimes.map(({ start, end, _id }) => {
                  const disabled = isTimeOccupied(start, end, selectedDate);
                  return (
                    <RadioCardItem
                      key={_id}
                      value={`${start}-${end}`}
                      disabled={disabled}
                      className="mr-2"
                    >
                      <div
                        className={`border px-3 py-2 rounded-lg ${
                          disabled
                            ? "bg-gray-200 cursor-not-allowed"
                            : "active:border-secondary-foreground"
                        }`}
                      >
                        <Text weight="bold">
                          {start}-{end} {parseInt(start, 10) < 12 ? "AM" : "PM"}
                        </Text>
                      </div>
                    </RadioCardItem>
                  );
                })}
              </RadioCard>
            </FormField>

            {/* Helper Checkbox */}
            <FormField name="helper">
              <FormControl asChild>
                <Checkbox label="Extra Helper" />
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
