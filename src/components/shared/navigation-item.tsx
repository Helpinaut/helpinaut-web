import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { buttonVariants } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href: string;
  icon: LucideIcon;
  destructive?: boolean;
  onClick?: () => void;
};

export function NavigationItem({
  children,
  href,
  icon: Icon,
  destructive,
  onClick,
}: Props) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "w-full justify-start gap-3",
        destructive && "text-destructive hover:text-destructive",
      )}
      href={href}
      onClick={onClick}
    >
      <Icon aria-hidden="true" size={18} />
      <span>{children}</span>
    </Link>
  );
}
