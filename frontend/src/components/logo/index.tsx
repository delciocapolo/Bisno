import { cn } from "@src/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export default function LogoApp({ className, ...props }: ComponentProps<"h1">) {
  return (
    <Link to="/" className="inline-flex">
      <h1 className={cn("font-heading text-3xl", className)} {...props}>
        BISNO
        <span className="text-primary">.</span>
      </h1>
    </Link>
  );
}
