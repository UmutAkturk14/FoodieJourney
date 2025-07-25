import React, { useState } from "react";
import { Copy } from "lucide-react";

// Base props shared between both <a> and <button>
interface BaseProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "call-to-action" | "outlined" | "basic";
  size?: "sm" | "md" | "lg";
  className?: string;
  copyText?: string;
}

// Props for anchor version
interface AnchorButtonProps
  extends BaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "type" | "onClick"> {
  to: string;
  as?: "a";
}

// Props for button version
interface RegularButtonProps
  extends BaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: undefined;
  as?: "button";
}

type ButtonProps = AnchorButtonProps | RegularButtonProps;

export const Button: React.FC<ButtonProps> = ({
  variant = "basic",
  size = "md",
  className = "",
  copyText,
  children,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const baseStyle =
    "rounded flex items-center gap-2 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeMap = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-6 py-3 text-lg h-12",
  };

  const variantMap = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-emerald-400 disabled:cursor-not-allowed",
    secondary:
      "bg-white hover:bg-gray-100 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed",
    "call-to-action":
      "bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-emerald-400 disabled:cursor-not-allowed",
    outlined:
      "border border-gray-200 text-amber-700 hover:text-amber-800 rounded-lg hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed",
    basic:
      "text-emerald-600 hover:text-emerald-800 border-b-2 border-transparent hover:border-emerald-700 rounded-none disabled:opacity-50 disabled:cursor-not-allowed",
  } as const;

  const variantClasses = variantMap[variant];
  const sizeClasses = sizeMap[size];
  const combinedClassName =
    `${baseStyle} ${sizeClasses} ${variantClasses} ${className}`.trim();

  const handleCopy = async () => {
    if (!copyText) return;

    try {
      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Anchor rendering
  if ("to" in props && props.to) {
    const { to, ...anchorProps } = props;
    return (
      <a
        href={to}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      >
        {children ?? "Visit Link"}
      </a>
    );
  }

  // Button rendering
  const { onClick, disabled, ...buttonProps } = props as RegularButtonProps;

  return (
    <div className="relative inline-block group">
      <button
        type="button"
        onClick={(e) => {
          if (copyText) handleCopy();
          onClick?.(e);
        }}
        disabled={disabled}
        className={combinedClassName}
        {...buttonProps}
      >
        {children ?? "Click Me"}
        {copyText && (
          <span className="ml-3 p-1.5 rounded-md hover:bg-amber-500/50 transition-colors">
            <Copy className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
          </span>
        )}
      </button>

      {isCopied && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg whitespace-nowrap z-10">
          Copied!
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
        </div>
      )}
    </div>
  );
};
