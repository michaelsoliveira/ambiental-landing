import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-body text-neutral-900 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
