"use client";

import { logout } from "@/features/auth/auth.slice";
import { User } from "@/features/users/user.types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import {
  ChevronRight,
  Hand,
  Heart,
  Home,
  LogIn,
  LogOut,
  LucideIcon,
  Menu,
  MessageCircle,
  Search,
  Settings,
  Signpost,
  Toolbox,
  User2,
  UserPlus2,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { Logo } from "../assets/logo";
import { Button, buttonVariants } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LanguageSelector } from "./language-selector";
import { ThemeSelector } from "./theme-selector";

function NavigationItem({
  children,
  href,
  icon: Icon,
  onClick,
}: {
  children: ReactNode;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}) {
  return (
    <Link
      className="flex h-10 w-full items-center space-x-3 px-4"
      href={href}
      onClick={onClick}
    >
      <Icon aria-hidden="true" size={18} />
      <span>{children}</span>
    </Link>
  );
}

export function NavigationMenu({ user }: { user: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const t = useTranslations("Header.navigation-menu");
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger
        aria-label={isMenuOpen ? t("close-menu") : t("open-menu")}
        render={
          <Button className="lg:hidden" size="icon" variant="ghost">
            <Menu aria-hidden="true" size={20} />
          </Button>
        }
        type="button"
      />
      <SheetContent
        id="mobile-menu"
        className="w-72 sm:w-80"
        side="left"
        showCloseButton={false}
      >
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-between">
              <div className="item bg-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg">
                <Logo size={22} className="text-card" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-2">
                <ThemeSelector />
                <LanguageSelector />
                <SheetClose
                  className={cn(
                    buttonVariants({ variant: "default", size: "icon" }),
                    "bg-destructive absolute -right-12",
                  )}
                >
                  <X />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 p-2">
          <NavigationItem
            href="/"
            icon={Home}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("home")}
          </NavigationItem>
          <NavigationItem
            href="/adverts"
            icon={Search}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("browse")}
          </NavigationItem>
          <Collapsible>
            <CollapsibleTrigger
              render={
                <div className="text-muted-foreground flex h-10 w-full items-center justify-between px-4">
                  <span>{t("create-section.heading")}</span>
                  <ChevronRight className="size-4 transition-transform in-data-closed:rotate-0 in-data-open:rotate-90" />
                </div>
              }
              nativeButton={false}
            />
            <CollapsibleContent className="flex h-(--collapsible-panel-height) flex-col gap-2 overflow-hidden transition-all duration-300 data-ending-style:h-0 data-starting-style:h-0">
              <NavigationItem href="#" icon={Hand}>
                {t("create-section.request")}
              </NavigationItem>
              <NavigationItem href="#" icon={Toolbox}>
                {t("create-section.offer")}
              </NavigationItem>
            </CollapsibleContent>
          </Collapsible>
          {user && (
            <Collapsible>
              <CollapsibleTrigger
                render={
                  <div className="text-muted-foreground flex h-10 w-full items-center justify-between px-4">
                    <span>{t("activity-section.heading")}</span>
                    <ChevronRight className="size-4 transition-transform in-data-closed:rotate-0 in-data-open:rotate-90" />
                  </div>
                }
                nativeButton={false}
              />
              <CollapsibleContent className="flex h-(--collapsible-panel-height) flex-col space-y-2 overflow-hidden transition-all duration-300 data-ending-style:h-0 data-starting-style:h-0">
                <NavigationItem href="#" icon={Signpost}>
                  {t("activity-section.listings")}
                </NavigationItem>
                <NavigationItem href="#" icon={MessageCircle}>
                  {t("activity-section.chats")}
                </NavigationItem>
                <NavigationItem href="#" icon={Heart}>
                  {t("activity-section.saved")}
                </NavigationItem>
              </CollapsibleContent>
            </Collapsible>
          )}
        </nav>
        <SheetFooter className="bg-muted/50 border-t px-2 py-6">
          <nav className="flex flex-col gap-2">
            {user ? (
              <>
                <NavigationItem href="#" icon={User2}>
                  {t("user-section.profile")}
                </NavigationItem>
                <NavigationItem href="#" icon={Settings}>
                  {t("user-section.settings")}
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
                  {t("user-section.logout")}
                </Button>
              </>
            ) : (
              <>
                <NavigationItem href="/login" icon={LogIn}>
                  {t("user-section.login")}
                </NavigationItem>
                <NavigationItem href="/signup" icon={UserPlus2}>
                  {t("user-section.signup")}
                </NavigationItem>
              </>
            )}
          </nav>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
