"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MonitorSmartphone, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ThemeSelector({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeSelector");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(className)}
        render={
          <Button size="icon" variant="ghost">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">{t("label")}</span>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
            <DropdownMenuRadioItem value="light">
              <Sun aria-hidden="true" />
              {t("light")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <Moon aria-hidden="true" />
              {t("dark")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <MonitorSmartphone aria-hidden="true" />
              {t("system")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
