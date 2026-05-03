import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  separator?: "none" | "top" | "bottom" | "both";
  title?: string;
};

export function NavigationSection({
  children,
  className,
  separator = "none",
  title,
}: Props) {
  return (
    <section className={cn("space-y-2", className)}>
      {(separator === "top" || separator === "both") && <Separator />}
      {title && (
        <h3 className="text-muted-foreground px-2 text-xs font-medium tracking-wide">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
      {(separator === "bottom" || separator === "both") && <Separator />}
    </section>
  );
}
