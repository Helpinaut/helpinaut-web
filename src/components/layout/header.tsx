"use client";

import { ArrowDown, Plus, Search } from "lucide-react";
import { Logo } from "../assets/logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { NavigationSheet } from "../shared/navigation-sheet";

export function Header() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

  const toggleMobileSearchOpen = () => {
    setIsMobileSearchOpen((prev) => !prev);
  };

  return (
    <header className="bg-card supports-backdrop-filter:bg-card/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <a
        className="bg-primary text-primary-foreground sr-only flex items-center justify-between gap-1.5 rounded-md px-3! py-1! text-sm font-medium focus:not-sr-only focus:absolute focus:top-4.5 focus:left-7"
        href="#main"
      >
        Skip to main content
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
                Search services
              </Label>
              <Input
                id="desktop-search"
                className="peer ps-9"
                placeholder="Search services..."
                type="search"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                aria-controls="mobile-search-bar"
                aria-expanded={isMobileSearchOpen}
                aria-label={
                  isMobileSearchOpen ? "Hide search bar" : "Show search bar"
                }
                className="md:hidden"
                onClick={toggleMobileSearchOpen}
                size="icon"
                variant="ghost"
              >
                <Search aria-hidden="true" size={20} />
              </Button>
              <Button className="hidden sm:flex">
                <Plus aria-hidden="true" size={16} />
                <span>Post an advert</span>
              </Button>
              <Button
                aria-label="Post an advert"
                className="sm:hidden"
                size="icon"
              >
                <Plus aria-hidden="true" size={20} />
              </Button>
              <NavigationSheet user={null} />
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
                Search services
              </Label>
              <Input
                id="mobile-search"
                className="peer ps-9 text-sm"
                placeholder="Search services..."
                type="search"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
