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
import { ThemeToggle } from "./theme-toggle";

export function NavigationSheet({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              Home
            </NavigationItem>
            <NavigationItem
              href="#main"
              icon={Search}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore services
            </NavigationItem>
          </NavigationSection>
          <NavigationSection title="Create" separator="bottom">
            <NavigationItem href="#" icon={HandCoins}>
              Request a service
            </NavigationItem>
            <NavigationItem href="#" icon={HandPlatter}>
              Offer a service
            </NavigationItem>
          </NavigationSection>
          {user && (
            <NavigationSection title="My activity">
              <NavigationItem href="#" icon={FileText}>
                My listings
              </NavigationItem>
              <NavigationItem href="#" icon={MessageCircle}>
                Messages
              </NavigationItem>
              <NavigationItem href="#" icon={Heart}>
                Saved
              </NavigationItem>
            </NavigationSection>
          )}
          <NavigationSection title="Support">
            <NavigationItem href="#" icon={LifeBuoy}>
              Help center
            </NavigationItem>
          </NavigationSection>
        </nav>
        <SheetFooter className="bg-muted/50 border-t px-2 py-6">
          <nav className="flex flex-col gap-6">
            <NavigationSection title="Account" separator="bottom">
              {user ? (
                <>
                  <NavigationItem href="#" icon={User2}>
                    Profile
                  </NavigationItem>
                  <NavigationItem href="#" icon={Settings}>
                    Settings
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
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavigationItem href="/login" icon={LogIn}>
                    Log in
                  </NavigationItem>
                  <NavigationItem href="/signup" icon={UserPlus2}>
                    Sign up
                  </NavigationItem>
                </>
              )}
            </NavigationSection>
            <NavigationSection>
              <ThemeToggle />
              {/* //TODO: add language i18n selector */}
            </NavigationSection>
          </nav>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
