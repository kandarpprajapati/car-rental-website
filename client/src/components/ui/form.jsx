import React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { cn } from "@/lib/utils";

const Form = FormPrimitive.Root;

const FormControl = FormPrimitive.Control;

const FormField = React.forwardRef(({ className, name, ...props }, ref) => (
  <FormPrimitive.Field
    ref={ref}
    name={name}
    className={cn("mb-2.5 grid", className)}
    {...props}
  />
));

FormField.displayName = FormPrimitive.Field.displayName;

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <FormPrimitive.Label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-8 text-primary-foreground",
      className
    )}
    {...props}
  />
));

FormLabel.displayName = FormPrimitive.Label.displayName;

const FormMessage = React.forwardRef(({ className, ...props }, ref) => (
  <FormPrimitive.Message
    ref={ref}
    className={cn("text-sm text-black opacity-80", className)}
    {...props}
  />
));

FormMessage.displayName = FormPrimitive.Message.displayName;

const FormSubmit = React.forwardRef(({ className, ...props }, ref) => (
  <FormPrimitive.Submit
    ref={ref}
    className={cn("my-5", className)}
    {...props}
  />
));

FormSubmit.displayName = FormPrimitive.Submit.displayName;

export { Form, FormControl, FormField, FormLabel, FormMessage, FormSubmit };
