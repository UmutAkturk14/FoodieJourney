import React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  className = "",
  ...props
}) => {
  const clampedValue = Math.min(100, Math.max(0, value)); // clamp between 0 and 100

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
      className={`w-full bg-gray-200 rounded overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="bg-emerald-600 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${clampedValue}%`, minWidth: "2rem" }}
      />
    </div>
  );
};
