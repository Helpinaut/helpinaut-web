import { MissionBanner } from "@/components/layout/mission-banner";
import { Hero } from "@/components/layout/hero";
import { CategoryCarousel } from "@/features/categories/components/category-carousel";
import { parseAdvertFilters } from "@/lib/adverts/parse-advert-filters";
import { HowItWorksBanner } from "@/components/layout/how-it-works-banner";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseAdvertFilters(params);
  // const adverts = await getAdverts(filters);

  return (
    <>
      <Hero />
      <main id="main-content">
        {/* //? Add `initialAdverts={adverts}` as a new component prop */}
        {/* <AdvertsFeed initialFilters={filters} /> */}
        <CategoryCarousel />
        <HowItWorksBanner />
        <MissionBanner />
      </main>
    </>
  );
}
