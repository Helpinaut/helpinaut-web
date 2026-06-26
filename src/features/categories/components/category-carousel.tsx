"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { advertCategoryIcon } from "@/lib/adverts/constraints";
import { useCategories } from "@/lib/hooks/use-categories";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Baloo_Da_2 } from "next/font/google";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

const CarouselSkeleton = () => {
  return (
    <Carousel
      className="mx-auto w-full max-w-6xl"
      opts={{
        align: "start",
        watchDrag: false,
      }}
    >
      <CarouselContent className="py-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            key={i}
          >
            <div>
              <Card className="border-accent border">
                <CardContent className="flex items-center justify-center gap-3 md:justify-start">
                  <Skeleton className="flex size-4" />
                  <Skeleton className="h-5 w-full" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:inline-flex" disabled />
      <CarouselNext className="hidden sm:inline-flex" disabled />
    </Carousel>
  );
};

export function CategoryCarousel() {
  const t = useTranslations("HomePage");
  const tCategories = useTranslations("response.category");
  const { categories, loading } = useCategories();

  return (
    <section className="overflow-hidden py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h3
          className={cn(
            balooDa2.className,
            "text-3xl leading-[1.15] font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          )}
        >
          {t("categories.heading")}
        </h3>
        <p className="text-muted-foreground mt-5">
          {t("categories.description")}
        </p>
        <div className="mt-8">
          {loading || categories.length === 0 ? (
            <CarouselSkeleton />
          ) : (
            <Carousel
              className="mx-auto w-full max-w-6xl"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="py-3">
                {categories.map((category) => {
                  const Icon = advertCategoryIcon[category.value].icon;
                  const label = tCategories.has(category.value)
                    ? tCategories(category.value)
                    : category.value;

                  return (
                    <CarouselItem
                      className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      key={category.value}
                    >
                      <div>
                        <Link href={`/adverts?category=${category.value}`}>
                          <Card className="group border-accent border transition-all hover:-translate-y-1.5 hover:shadow-lg">
                            <CardContent className="flex items-center justify-center gap-3 md:justify-start">
                              <Icon className="flex size-4" />
                              <h4 className="font-semibold">{label}</h4>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:inline-flex" />
              <CarouselNext className="hidden sm:inline-flex" />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}
