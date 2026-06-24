"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { Hand, Plus, Toolbox, User2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Baloo_Da_2 } from "next/font/google";
import { LanguageSelector } from "../shared/language-selector";
import { NavigationSheet } from "../shared/navigation-sheet";
import { ThemeSelector } from "../shared/theme-selector";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

export default function Header() {
  const t = useTranslations("Header");
  const user = useAppSelector((s) => s.user.user);

  return (
    <>
      <a
        className="bg-primary text-primary-foreground absolute left-0 z-99 m-3 -translate-y-16 rounded-lg px-2.5 py-2 transition focus:translate-y-0"
        href="#main-content"
      >
        {t("skip-to-content")}
      </a>
      <header className="fixed inset-x-0 top-10 z-50 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="bg-card flex h-16 items-center justify-between rounded-lg border px-6 shadow-lg md:grid md:grid-cols-[1fr_auto_1fr]">
            <NavigationSheet user={user} />
            <nav className="hidden items-center gap-2 text-sm lg:flex">
              <Link
                className={cn(buttonVariants({ variant: "ghost" }))}
                href="/#how-it-works"
              >
                {t("how-it-works")}
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "ghost" }))}
                href="/adverts"
              >
                {t("browse")}
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "ghost" }))}
                href="/adverts?isOffer=false"
              >
                {t("requests")}
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "ghost" }))}
                href="/adverts?isOffer=true"
              >
                {t("offers")}
              </Link>
            </nav>
            <Link
              href="/"
              className="flex items-center justify-self-start sm:justify-self-center"
            >
              <span
                className={cn(
                  balooDa2.className,
                  "text-2xl font-bold [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]",
                )}
              >
                Helpinaut
              </span>
            </Link>
            <div className="flex items-center gap-2 md:justify-self-end">
              <ThemeSelector className="xs:flex hidden" />
              <LanguageSelector className="xs:flex hidden" />
              <Link
                className={cn(buttonVariants({ variant: "ghost" }))}
                href={user ? "/profile" : "/login"}
                aria-label={user ? t("user.profile") : t("user.login")}
              >
                <User2 className="flex" />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label={t("create.label")}
                  render={
                    <Button
                      variant="default"
                      size="icon"
                      className="lg:w-auto lg:px-2.5"
                    >
                      <Plus className="flex lg:hidden" />
                      <span className="hidden lg:flex">
                        {t("create.label")}
                      </span>
                    </Button>
                  }
                />
                <DropdownMenuContent className="w-full space-y-1">
                  <DropdownMenuItem
                    render={
                      <Link
                        href="#"
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Hand />
                        {t("create.request-help")}
                      </Link>
                    }
                  />
                  <DropdownMenuItem
                    render={
                      <Link
                        href="#"
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Toolbox />
                        {t("create.offer-help")}
                      </Link>
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
