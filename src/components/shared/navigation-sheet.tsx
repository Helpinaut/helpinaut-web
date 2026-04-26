import {
  FileText,
  HandHelping,
  Heart,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Settings,
  User,
  UserPlus,
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
import { UserDto } from "@/features/auth/auth.types";
import { NavigationSection } from "./navigation-section";
import { NavigationItem } from "./navigation-item";

export function NavigationSheet({ user }: { user: UserDto | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        render={
          <Button className="md:hidden" size="icon" variant="ghost">
            <Menu aria-hidden="true" size={20} />
          </Button>
        }
      />
      <SheetContent id="mobile-menu" className="w-72 sm:w-80" side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-3 flex flex-col gap-6">
          <NavigationSection>
            <NavigationItem href="#main" icon={Search}>
              Explore services
            </NavigationItem>
          </NavigationSection>
          <NavigationSection title="Create">
            <NavigationItem href="#" icon={HandHelping}>
              Request a service
            </NavigationItem>
            <NavigationItem href="#" icon={Plus}>
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
                <NavigationItem href="#" icon={User}>
                  Profile
                </NavigationItem>
                <NavigationItem href="#" icon={Settings}>
                  Settings
                </NavigationItem>
                <NavigationItem href="#" icon={User}>
                  Profile
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
                <NavigationItem href="#" icon={LogIn}>
                  Log in
                </NavigationItem>
                <NavigationItem href="#" icon={UserPlus}>
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
