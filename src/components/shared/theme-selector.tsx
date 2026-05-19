"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MonitorSmartphone, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ThemeSelector({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const t = useTranslations("ThemeSelector");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(className)}
        render={
          <Button size="icon" variant="outline">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">{t("label")}</span>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun aria-hidden="true" />
            {t("light")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon aria-hidden="true" />
            {t("dark")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorSmartphone aria-hidden="true" />
            {t("system")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
