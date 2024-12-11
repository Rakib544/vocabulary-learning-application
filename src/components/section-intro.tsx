import { cn } from "@/lib/utils";
import clsx from "clsx";
import { FadeIn } from "./fade-in";

export function SectionIntro({
  eyebrow,
  title,
  children,
  className = "",
  smaller = false,
  invert = false,
  centered = false,
  ...props
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
  smaller?: boolean;
  invert?: boolean;
  props?: any;
  centered?: boolean;
}) {
  return (
    <FadeIn
      className={cn(
        "max-w-xl",
        className,
        centered ? "mx-auto text-center" : ""
      )}
    >
      <h2>
        {eyebrow && (
          <>
            <span
              className={clsx(
                "block font-display uppercase text-xs tracking-wider font-bold",
                invert ? "text-white" : "text-primary"
              )}
            >
              {eyebrow}
            </span>
            <span className="sr-only"> - </span>
          </>
        )}
        <span
          className={clsx(
            "block mb-3 mt-2 [text-wrap:balance] !leading-tight",
            smaller
              ? "text-2xl font-extrabold"
              : "text-2xl lg:text-3xl font-extrabold",
            invert ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </span>
      </h2>
      {children && (
        <div
          className={clsx(
            "text-[17px] leading-8",
            invert ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {children}
        </div>
      )}
    </FadeIn>
  );
}
