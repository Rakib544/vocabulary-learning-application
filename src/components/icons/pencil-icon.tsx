import { IconProps } from "./check-icon";

export function PencilIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      width="24"
      height="24"
      color="rgb(102, 102, 255)"
      {...props}
    >
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
    </svg>
  );
}
