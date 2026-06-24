import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Baloo_Da_2 } from "next/font/google";
import { buttonVariants } from "../ui/button";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

export async function MissionBanner() {
  const t = await getTranslations("HomePage.mission-banner");

  return (
    <section className="py-38">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h3
          className={cn(
            balooDa2.className,
            "text-3xl leading-[1.15] font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          )}
        >
          {t("heading")}
        </h3>
        <p className="text-muted-foreground mt-5 max-w-xl leading-[1.35]">
          {t("description")}
        </p>
        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "flex h-10 gap-2 px-6 py-3",
            )}
          >
            {t("cta")}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
