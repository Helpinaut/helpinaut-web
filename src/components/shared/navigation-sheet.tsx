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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { User } from "@/features/auth/auth.types";
import { NavigationSection } from "./navigation-section";
import { NavigationItem } from "./navigation-item";

export function NavigationSheet({ user }: { user: User | null }) {
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
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6">
          <NavigationSection>
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
          <NavigationSection title="Create">
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
          <NavigationSection title="Account">
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
          <NavigationSection title="Support">
            <NavigationItem href="#" icon={LifeBuoy}>
              Help center
            </NavigationItem>
          </NavigationSection>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
