import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import React from "react";
import { Text } from "@radix-ui/themes";

// const Checkbox = ({ label }) => {
//   return (
//     <div className="flex items-center space-x-2">
//       <CheckboxPrimitive.Root
//         className={cn(
//           "w-5 h-5 flex items-center justify-center rounded border border-gray",
//           "focus:ring-1 focus:ring-secondary-foreground focus:outline-none data-[state=checked]:bg-secondary-foreground data-[state=checked]:border-transparent"
//         )}
//       >
//         <CheckboxPrimitive.Indicator>
//           <Check className="w-4 h-4 text-white" />
//         </CheckboxPrimitive.Indicator>
//       </CheckboxPrimitive.Root>
//       <span className="text-sm font-medium text-accent-foreground">
//         {label}
//       </span>
//     </div>
//   );
// };

const CheckBoxRoot = CheckboxPrimitive.Root;
const CheckboxIndicator = CheckboxPrimitive.Indicator;

const Checkbox = React.forwardRef(
  ({ className, label, price, ...props }, ref) => (
    <div
      className={cn(
        "flex items-center justify-between w-full p-3 transition hover:bg-gray-50",
        "data-[state=checked]:border-secondary-foreground data-[state=checked]:bg-gray-100",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <CheckBoxRoot
          ref={ref}
          className={cn(
            "w-5 h-5 flex items-center justify-center rounded border border-gray",
            "focus:ring-1 focus:ring-secondary-foreground focus:outline-none",
            "data-[state=checked]:bg-secondary-foreground data-[state=checked]:border-transparent"
          )}
          {...props}
        >
          <CheckboxIndicator>
            <Check className="w-4 h-4 text-white" />
          </CheckboxIndicator>
        </CheckBoxRoot>
        <span className="text-sm font-medium text-accent-foreground">
          {label}
        </span>
      </div>
      {/* Price Section */}
      {price && (
        <div className="text-right">
          <Text className="text-sm font-semibold text-gray-900">{price}</Text>
        </div>
      )}
    </div>
  )
);

Checkbox.displayName = CheckboxPrimitive.Checkbox.displayName;

export { Checkbox };
