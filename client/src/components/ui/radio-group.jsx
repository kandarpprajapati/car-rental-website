import * as RadioPrimitive from "@radix-ui/react-radio-group";
import React from "react";

import { cn } from "@/lib/utils";

const Radio = RadioPrimitive.Root;

const RadioItem = RadioPrimitive.Item;

const RadioGroup = React.forwardRef(
  ({ className, options, name, ...props }, ref) => (
    <Radio
      ref={ref}
      name={name}
      className={cn("flex flex-col space-y-2", className)}
      {...props}
    >
      {options.map((option, index) => (
        <RadioItem
          key={index}
          value={option.value}
          className={cn(
            "flex items-center space-x-2 cursor-pointer group",
            "w-full py-2 transition"
          )}
        >
          <div className="flex-shrink-0 w-4 h-4 border border-gray-400 rounded-full group-data-[state=checked]:border-transparent group-data-[state=checked]:bg-secondary-foreground" />
          <span className="text-sm font-medium text-gray-800">
            {option.label}
          </span>
        </RadioItem>
      ))}
    </Radio>
  )
);

RadioGroup.displayName = RadioPrimitive.RadioGroup.displayName;

export { RadioGroup };
