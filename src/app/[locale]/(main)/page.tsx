import { Banner } from "@/components/layout/banner";
import { Hero } from "@/components/layout/hero";
import { Button, buttonVariants } from "@/components/ui/button";

import { AdvertsFeed } from "@/features/adverts/components/adverts-feed";
import { CategoryCarousel } from "@/features/categories/components/category-carousel";
import { Link } from "@/i18n/navigation";
import { parseAdvertFilters } from "@/lib/adverts/parse-advert-filters";
import { cn } from "@/lib/utils";
import { ArrowRight, Wrench } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Baloo_Da_2 } from "next/font/google";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseAdvertFilters(params);
  const t = await getTranslations("Banner");
  // const adverts = await getAdverts(filters);

  return (
    <>
      <Hero />
      <main id="main-content">
        {/* //? Add `initialAdverts={adverts}` as a new component prop */}
        {/* <AdvertsFeed initialFilters={filters} /> */}
        <CategoryCarousel />
        <section className="py-40">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 text-center">
            <h3
              className={cn(
                balooDa2.className,
                "text-3xl leading-[1.15] font-semibold tracking-tight sm:text-4xl lg:text-5xl",
              )}
            >
              {t("title")}
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
      </main>
    </>
  );
}
