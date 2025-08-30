import React from "react";

interface ProgressProps {
  value: number; // percentage (0–100)
}

export function Progress({ value }: ProgressProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
