"use client";

import clsx from "clsx";

type Props = {
  type?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
};

export function TextField({
  type = "text",
  label,
  value,
  placeholder,
  onChange,
  error,
}: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="front-medium text-sm">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full rounded border px-3 py-2 transition outline-none",
          error
            ? "border-red-500 focus:border-red-600"
            : "border-gray-300 focus:border-blue-600",
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
