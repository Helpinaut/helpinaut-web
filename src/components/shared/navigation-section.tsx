import { ReactNode } from "react";
import { Separator } from "../ui/separator";

type Props = {
  children: ReactNode;
  title?: string;
};

export function NavigationSection({ children, title }: Props) {
  return (
    <section className="space-y-2">
      {title && (
        <h3 className="text-muted-foreground px-2 text-xs font-medium tracking-wide">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
      <Separator />
    </section>
  );
}
