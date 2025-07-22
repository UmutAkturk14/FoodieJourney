// components/ui/Badge.tsx
import React from "react";
import { cn } from "@lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "subtle" | "secondary";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full";

  const variants: Record<typeof variant, string> = {
    default: "bg-emerald-100 text-emerald-800",
    outline: "border border-emerald-300 text-emerald-700",
    subtle: "bg-emerald-50 text-emerald-700",
    secondary: "bg-primary-light text-primary",
  };

  return (
    <span
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    />
  );
}
