import { cn } from "@/lib/utils";
import { CheckIcon } from "./icons";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}
interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  invert?: boolean;
}

const List = ({ className, ...props }: ListProps) => {
  return <ul className={cn("list-inside space-y-2", className)} {...props} />;
};

const ListItem = ({
  className,
  invert = false,
  children,
  ...props
}: ListItemProps) => {
  return (
    <li
      className={cn(
        "!leading-8 flex gap-x-1",
        className,
        invert ? "text-white" : "text-foreground"
      )}
      {...props}
    >
      <CheckIcon
        className={cn(
          "h-7 w-7 shrink-0 ",
          invert ? "fill-white" : "fill-indigo-600"
        )}
      />{" "}
      <span>{children}</span>
    </li>
  );
};

export { List, ListItem };
