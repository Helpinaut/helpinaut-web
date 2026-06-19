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
import { AdvertCategoryUI } from "@/lib/adverts/contraints";
import { useCategories } from "@/lib/hooks/use-categories";
import { cn } from "@/lib/utils";
import { Baloo_Da_2 } from "next/font/google";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

const CarouselSkeleton = () => {
  return (
    <Carousel
      className="mx-auto w-full max-w-6xl"
      opts={{
        align: "start",
        dragFree: false,
      }}
    >
      <CarouselContent className="py-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            key={i}
          >
            <div className="pl-1">
              <Card className="border-accent border">
                <CardContent className="p-6">
                  <div className="xs:justify-start flex items-center justify-center gap-3">
                    <Skeleton className="xs:flex hidden size-4" />
                    <Skeleton className="h-5 w-full" />
                  </div>
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
          Categories
        </h3>
        <p className="text-muted-foreground mt-5">
          Discover local experts and enthusiasts, or find someone who needs
          assistance with this matters.
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
                  const Icon = AdvertCategoryUI[category.value].icon;

                  return (
                    <CarouselItem
                      className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      key={category.value}
                    >
                      <div className="pl-1">
                        <Link href={`/adverts?category=${category.value}`}>
                          <Card className="group border-accent border transition-all hover:-translate-y-1.5 hover:shadow-lg">
                            <CardContent className="p-6">
                              <div className="xs:justify-start flex items-center justify-center gap-3">
                                <Icon className="xs:flex hidden size-4" />
                                <h4 className="font-semibold">
                                  {category.value}
                                </h4>
                              </div>
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
