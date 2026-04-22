import {
  SiBluesky,
  SiFacebook,
  SiInstagram,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Logo } from "../assets/logo";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/50 mt-16 w-full border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="item bg-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg">
                <Logo size={22} className="text-card" aria-hidden="true" />
              </div>
              <span className="text-lg font-semibold">Helpinaut</span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Exploring new ways of helping communities connect through local
              service listing.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="size-9">
                <SiFacebook size={16} />
              </Button>
              <Button variant="outline" size="icon" className="size-9">
                <SiInstagram size={16} />
              </Button>
              <Button variant="outline" size="icon" className="size-9">
                <SiX size={16} />
              </Button>
              <Button variant="outline" size="icon" className="size-9">
                <SiBluesky size={16} />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="mb-4">Quick links</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Prices
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Popular categories</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Plumbing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Carpentry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Electrician
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Pets
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Get notified about the latest offers and services in your email.
            </p>
            <div className="relative">
              <Input
                type="email"
                autoComplete="email"
                className="peer ps-9"
                inputMode="email"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                <Mail size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p>© 2026 Helpinaut. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Terms of use
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
