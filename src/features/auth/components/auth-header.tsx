import { Logo } from "@/components/assets/logo";
import { LanguageSelector } from "@/components/shared/language-selector";
import { ThemeSelector } from "@/components/shared/theme-selector";
import { Link } from "@/i18n/navigation";

export default function AuthHeader() {
  return (
    <header className="p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <div className="item bg-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            <Logo size={22} className="text-card" aria-hidden="true" />
          </div>
        </Link>
        <div className="flex gap-2">
          <ThemeSelector />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
