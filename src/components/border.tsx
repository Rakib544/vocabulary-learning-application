import clsx from "clsx";
import React from "react";

interface BorderProps extends React.HTMLAttributes<HTMLBaseElement> {
  position?: string;
  invert?: boolean;
  as?: any;
}

export function Border({
  className,
  position = "top",
  invert = false,
  as: Component = "div",
  children,
  ...props
}: BorderProps) {
  return (
    <Component
      className={clsx(
        className,
        "relative before:absolute after:absolute",
        invert
          ? "before:bg-white after:bg-white/10"
          : "before:bg-indigo-600 after:bg-indigo-600/10",
        position === "top" &&
          "before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px",
        position === "left" &&
          "before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px"
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
