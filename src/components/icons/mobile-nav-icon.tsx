import { IconProps } from "./check-icon";

export function MobileNavIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-neutral-950 group-hover:fill-neutral-700"
      {...props}
    >
      <path d="M2 6h20v2H2zM2 16h20v2H2z"></path>
    </svg>
  );
}
