"use client";

import { ArrowDown, HandCoins, HandPlatter, Plus, Search } from "lucide-react";
import { Logo } from "../assets/logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { NavigationSheet } from "../shared/navigation-sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { useAppSelector } from "@/store/hooks";
import { ThemeSelector } from "../shared/theme-selector";
import { LanguageSelector } from "../shared/language-selector";
import { useTranslations } from "next-intl";

export function Header() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const user = useAppSelector((s) => s.user.user);
  const t = useTranslations("Header");

  const toggleMobileSearchOpen = () => {
    setIsMobileSearchOpen((prev) => !prev);
  };

  return (
    <header className="bg-card supports-backdrop-filter:bg-card/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <a
        className="bg-primary text-primary-foreground sr-only flex items-center justify-between gap-1.5 rounded-md px-3! py-1! text-sm font-medium focus:not-sr-only focus:absolute focus:top-4.5 focus:left-7"
        href="#main"
      >
        {t("skip-to-content")}
        <ArrowDown aria-hidden="true" size={16} />
      </a>
      <nav aria-label="Primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2">
              <div className="item bg-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg">
                <Logo aria-hidden="true" className="text-card" size={22} />
              </div>
              <span className="text-lg font-semibold">Helpinaut</span>
            </div>
            <div className="relative hidden max-w-md flex-1 md:flex">
              <Search
                aria-label="true"
                className="text-muted-foreground/80 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                size={16}
              />
              <Label className="sr-only" htmlFor="desktop-search">
                {t("search.label")}
              </Label>
              <Input
                id="desktop-search"
                className="peer ps-9"
                placeholder={t("search.placeholder")}
                type="search"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                aria-controls="mobile-search-bar"
                aria-expanded={isMobileSearchOpen}
                aria-label={
                  isMobileSearchOpen
                    ? t("search.aria-hide")
                    : t("search.aria-show")
                }
                className="md:hidden"
                onClick={toggleMobileSearchOpen}
                size="icon"
                variant="ghost"
              >
                <Search aria-hidden="true" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label={t("create.label")}
                  render={
                    <Button className="size-8 sm:h-8 sm:w-auto">
                      <Plus aria-hidden="true" />
                      <span className="hidden sm:inline">
                        {t("search.label")}
                      </span>
                    </Button>
                  }
                  type="button"
                />
                <DropdownMenuContent className="w-full space-y-1">
                  <DropdownMenuItem
                    render={
                      <Link href="#" className="flex items-center gap-2">
                        <HandCoins aria-hidden="true" />
                        {t("create.request-help")}
                      </Link>
                    }
                  />
                  <DropdownMenuItem
                    render={
                      <Link href="#" className="flex items-center gap-2">
                        <HandPlatter aria-hidden="true" />
                        {t("create.offer-help")}
                      </Link>
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <LanguageSelector className="hidden md:flex" />
              <ThemeSelector className="hidden md:flex" />
              <NavigationSheet user={user} />
            </div>
          </div>
          <div
            id="mobile-search-bar"
            className={cn(
              "overflow-hidden transition-all duration-300 md:hidden",
              isMobileSearchOpen
                ? "max-h-40 translate-y-0 opacity-100"
                : "max-h-0 -translate-y-2 opacity-0",
            )}
          >
            <Separator className="my-4" />
            <div className="relative">
              <Search
                aria-hidden="true"
                className="text-muted-foreground/80 absolute top-1/2 left-3 -translate-y-1/2"
                size={16}
              />
              <Label className="sr-only" htmlFor="mobile-search">
                {t("search.label")}
              </Label>
              <Input
                id="mobile-search"
                className="peer ps-9 text-sm"
                placeholder={t("search.placeholder")}
                type="search"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
