import { cn } from "@src/lib/utils";
import type { ComponentProps } from "react";

interface DividerProps extends ComponentProps<"hr"> {}

export default function Divider({ className, ...props }: DividerProps) {
  return (
    <hr
      className={cn("border-black-200/50 border-1.5", className)}
      {...props}
    />
  );
}
