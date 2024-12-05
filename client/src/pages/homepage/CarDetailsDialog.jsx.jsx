import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { RadioGroup } from "../../components/ui/radio-group";
import { TextArea } from "../../components/ui/textarea";

import { Flex, Text } from "@radix-ui/themes";
import { DialogDescription } from "../../components/ui/dialog";
import { RadioCard, RadioCardItem } from "../../components/ui/radiocards";

const CarDetailsDialog = ({ product }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="rounded-full" size="sm">
          + Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground">
            Car Details
          </DialogTitle>
          <DialogDescription>{`${product.title}'s details`}</DialogDescription>
        </DialogHeader>
        <div className="w-full grid gap-4 py-4">
          {/* Image before title */}
          <div className="flex flex-col items-center">
            <img
              src={product.imageUrl} // Replace with the actual image path
              alt="Dialog illustration"
              className="w-28 h-28 mb-4 object-cover rounded-full" // Style as needed
            />
          </div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="mt-4">
            {/* <label className="text-sm font-medium text-gray-700">
              Choose an option:
            </label> */}
            <RadioGroup
              name="exampleRadioGroup"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
              ]}
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Select time:
            </label>
            <RadioCard defaultValue="1" columns={{ initial: "1", sm: "3" }}>
              <RadioCardItem value="1">
                <Flex
                  direction="column"
                  width="100%"
                  className="border px-3 py-2 rounded-lg active:border-secondary-foreground"
                >
                  <Text weight="bold">10-11 AM</Text>
                </Flex>
              </RadioCardItem>
              <RadioCardItem value="2">
                <Flex
                  direction="column"
                  width="100%"
                  className="border px-3 py-2 rounded-lg active:border-secondary-foreground ml-2"
                >
                  <Text weight="bold">11-12 PM</Text>
                </Flex>
              </RadioCardItem>
              <RadioCardItem value="3">
                <Flex
                  direction="column"
                  width="100%"
                  className="border px-3 py-2 rounded-lg active:border-secondary-foreground ml-2"
                >
                  <Text weight="bold">12-01 PM</Text>
                </Flex>
              </RadioCardItem>
            </RadioCard>
          </div>

          {/* Checkbox */}
          <div className="mt-4">
            <label className="text-sm font-medium">Helper:</label>
            <Checkbox label="Extra Helper" />
          </div>
        </div>

        {/* Text Area */}
        <TextArea
          placeholder="Reply to comment…"
          label="Spacial Requirements"
        />

        <DialogFooter>
          <Button
            variant="secondary"
            className="text-sm shadow-md uppercase"
            type="submit"
          >
            Book this car
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsDialog;

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// const DialogInput = ({ label, placeholder }) => {
//   return (
//     <div className="grid grid-cols-4 items-center gap-4">
//       <Label htmlFor={`${label}Input`} className="text-left pl-2">
//         {label}
//       </Label>

//       <Input
//         id={`${label}Input`}
//         placeholder={placeholder}
//         className="col-span-3"
//       />
//     </div>
//   );
// };
