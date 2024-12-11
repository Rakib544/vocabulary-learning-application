import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const containerVariants = cva("mx-auto px-4 sm:px-6 md:px-4 md:max-w-3xl ", {
  variants: {
    size: {
      default: "lg:max-w-4xl lg:px-12",
      xs: "lg:px-2",
      sm: "lg:max-w-4xl lg:px-12",
      md: "lg:max-w-5xl lg:px-8",
      lg: "lg:max-w-7xl lg:px-14",
    },
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";
