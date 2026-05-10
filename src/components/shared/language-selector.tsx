"use client";

import { useLocale } from "next-intl";
import { Button } from "../ui/button";
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
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSelector({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const handleChangeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(className)}
        render={
          <Button variant="outline">
            <Languages aria-hidden="true" />
            <span className="sr-only">Select language</span>
            <span>{languages.find((lng) => lng.code === locale)?.label}</span>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={handleChangeLanguage}
          >
            {languages.map((lng) => (
              <DropdownMenuRadioItem
                key={lng.code}
                value={lng.code}
                disabled={lng.code === locale}
              >
                <span className="flex items-center space-x-2">
                  <span aria-hidden="true">{lng.flag}</span>
                  <span>{lng.label}</span>
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
