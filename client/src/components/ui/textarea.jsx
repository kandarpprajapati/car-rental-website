import React from "react";
import { cn } from "@/lib/utils";

const TextArea = React.forwardRef(
  ({ label, placeholder, className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <textarea
          ref={ref}
          className={cn(
            "w-full h-24 p-3 border border-input rounded-md resize-none flex bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-secondary-foreground focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-foreground focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
