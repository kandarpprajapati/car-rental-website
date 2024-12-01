import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { RadioGroup } from "../../components/ui/radio-group";
import { Checkbox } from "../../components/ui/checkbox";
import { TextArea } from "../../components/ui/textarea";
import { useState } from "react";

import CarImage from "../../../public/car-images/van.png";
import { Minus, Plus } from "lucide-react";
import { DialogDescription } from "../../components/ui/dialog";

const CarDetailsDialog = ({
  title = "ABC",
  description = "This is a description inside the dialog.",
}) => {
  const [counter, setCounter] = useState(1);

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
          <DialogDescription>ABC</DialogDescription>
        </DialogHeader>
        <div className="w-full grid gap-4 py-4">
          {/* Image before title */}
          <div className="flex flex-col items-center">
            <img
              src={CarImage} // Replace with the actual image path
              alt="Dialog illustration"
              className="w-28 h-28 mb-4 object-cover rounded-full" // Style as needed
            />
          </div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600">{description}</p>
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

          {/* Counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <label className="text-sm font-medium">Quantity</label>
              <label className="text-sm font-medium ml-2">{`(${counter} HOUR)`}</label>
            </div>
            <div className="flex items-center space-x-4 border border-gray rounded-md">
              <button
                disabled={counter === 1}
                onClick={() => counter > 1 && setCounter(counter - 1)}
                className="bg-zinc-200 p-2  rounded hover:bg-zinc-300 disabled:bg-zinc-100"
              >
                <Minus size={14} />
              </button>
              <span>{counter}</span>
              <button
                onClick={() => counter >= 1 && setCounter(counter + 1)}
                className="bg-zinc-200 p-2  rounded hover:bg-zinc-300"
              >
                <Plus size={14} />
              </button>
            </div>
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
