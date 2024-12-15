import * as RadioPrimitive from "@radix-ui/react-radio-group";
import React from "react";

import { cn } from "@/lib/utils";
import { Text } from "@radix-ui/themes";

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
            "flex items-center justify-between cursor-pointer group",
            "w-full p-3 transition hover:bg-gray-50",
            "group-data-[state=checked]:border-secondary-foreground group-data-[state=checked]:bg-gray-100"
          )}
        >
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-4 h-4 border border-gray-400 rounded-full group-data-[state=checked]:border-transparent group-data-[state=checked]:bg-secondary-foreground" />
            <span className="text-sm font-medium text-gray-800">
              {option.label}
            </span>
          </div>
          {/* Price Section */}
          {option.price && (
            <div className="text-right">
              <Text className="text-sm font-semibold text-gray-900">
                {option.price}
              </Text>
              {option.discountPrice && (
                <Text className="text-xs line-through text-gray-400">
                  {option.discountPrice}
                </Text>
              )}
            </div>
          )}
        </RadioItem>
      ))}
    </Radio>
  )
);

RadioGroup.displayName = RadioPrimitive.RadioGroup.displayName;

export { RadioGroup };
