"use client";

import {
  FileText,
  HandCoins,
  HandPlatter,
  Heart,
  Home,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  User2,
  UserPlus2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { User } from "@/features/users/user.types";
import { NavigationSection } from "./navigation-section";
import { NavigationItem } from "./navigation-item";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { Logo } from "../assets/logo";
import { ThemeSelector } from "./theme-selector";
import { LanguageSelector } from "./language-selector";
import { useTranslations } from "next-intl";

export function NavigationSheet({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const t = useTranslations("NavigationSheet");

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger
        aria-label={isMenuOpen ? t("close-menu") : t("open-menu")}
        render={
          <Button className="md:hidden" size="icon" variant="ghost">
            <Menu aria-hidden="true" size={20} />
          </Button>
        }
        type="button"
      />
      <SheetContent id="mobile-menu" className="w-72 sm:w-80" side="left">
        <SheetHeader>
          <SheetTitle>
            <Logo aria-hidden="true" size={22} />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6 p-2">
          <NavigationSection separator="bottom">
            <NavigationItem
              href="/"
              icon={Home}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("links.home")}
            </NavigationItem>
            <NavigationItem
              href="#main"
              icon={Search}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("links.explore-services")}
            </NavigationItem>
          </NavigationSection>
          <NavigationSection title={t("sections.create")} separator="bottom">
            <NavigationItem href="#" icon={HandCoins}>
              {t("links.request-help")}
            </NavigationItem>
            <NavigationItem href="#" icon={HandPlatter}>
              {t("links.offer-help")}
            </NavigationItem>
          </NavigationSection>
          {user && (
            <NavigationSection title={t("sections.activity")}>
              <NavigationItem href="#" icon={FileText}>
                {t("links.listings")}
              </NavigationItem>
              <NavigationItem href="#" icon={MessageCircle}>
                {t("links.messages")}
              </NavigationItem>
              <NavigationItem href="#" icon={Heart}>
                {t("links.saved")}
              </NavigationItem>
            </NavigationSection>
          )}
          <NavigationSection title={t("sections.support")}>
            <NavigationItem href="#" icon={LifeBuoy}>
              {t("links.help-center")}
            </NavigationItem>
          </NavigationSection>
        </nav>
        <SheetFooter className="bg-muted/50 border-t px-2 py-6">
          <nav className="flex flex-col gap-6">
            <NavigationSection title={t("sections.account")} separator="bottom">
              {user ? (
                <>
                  <NavigationItem href="#" icon={User2}>
                    {t("links.profile")}
                  </NavigationItem>
                  <NavigationItem href="#" icon={Settings}>
                    {t("links.settings")}
                  </NavigationItem>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive w-full justify-start gap-2"
                    onClick={() => {
                      dispatch(logout());
                      router.push("/");
                    }}
                  >
                    <LogOut aria-hidden="true" size={18} />
                    {t("links.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <NavigationItem href="/login" icon={LogIn}>
                    {t("links.login")}
                  </NavigationItem>
                  <NavigationItem href="/signup" icon={UserPlus2}>
                    {t("links.signup")}
                  </NavigationItem>
                </>
              )}
            </NavigationSection>
            <NavigationSection>
              <div className="flex space-x-2">
                <LanguageSelector />
                <ThemeSelector />
              </div>
            </NavigationSection>
          </nav>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
