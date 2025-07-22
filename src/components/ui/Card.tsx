import React from "react";
import { cn } from "@lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-white text-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";

export { Card };
