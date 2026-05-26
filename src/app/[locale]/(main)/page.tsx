import { Hero } from "@/components/layout/hero";
import { AdvertsFeed } from "@/features/adverts/components/adverts-feed";

export default function HomePage() {
  return (
    <>
      <Hero />
      <main id="main">
        <AdvertsFeed />
      </main>
    </>
  );
}
