"use client";

import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export function Button({
  children,
  loading,
  type = "button",
  className,
}: Props) {
  return (
    <button
      type={type}
      disabled={loading}
      className={clsx(
        "w-full rounded bg-blue-600 py-2 font-medium text-white transition disabled:opacity-50",
        className,
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
