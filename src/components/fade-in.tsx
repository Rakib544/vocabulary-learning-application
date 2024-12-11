"use client";

import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
import React, { createContext, useContext } from "react";

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px" };

interface FadeInProps extends HTMLMotionProps<"div"> {}

export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ className, ...props }, ref) => {
    let shouldReduceMotion = useReducedMotion();
    let isInStaggerGroup = useContext(FadeInStaggerContext);
    return (
      <motion.div
        className={className}
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        {...(isInStaggerGroup
          ? {}
          : {
              initial: "hidden",
              whileInView: "visible",
              viewport,
            })}
        {...props}
      />
    );
  }
);
FadeIn.displayName = "FadeIn";

interface FadeInStaggerProps extends HTMLMotionProps<"div"> {
  faster?: boolean;
}

export const FadeInStagger = React.forwardRef<
  HTMLDivElement,
  FadeInStaggerProps
>(({ faster = false, ...props }, ref) => {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
});

FadeInStagger.displayName = "FadeInStagger";
