import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { HeartHandshake } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Baloo_Da_2 } from "next/font/google";
import { SpaceBackground } from "../assets/space-background";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative h-[600px] overflow-hidden md:h-[750px]">
      <SpaceBackground />
      <div className="absolute inset-x-0 bottom-12 z-10 px-4 md:bottom-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <span className="flex w-fit items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-xs text-white">
              {t("badge")}
              <HeartHandshake className="size-4" />
            </span>
            <h2
              className={cn(
                balooDa2.className,
                "mt-8 text-4xl leading-[1.15] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl",
              )}
            >
              {t.rich("title", { br: () => <br /> })}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-[1.35] text-neutral-300 sm:text-lg">
              {t("description")}
            </p>
            <div className="xs:flex-row xs:items-center mt-8 flex flex-col items-start gap-4">
              <Link
                href="#"
                className="focus-visible:outline-surface-border-alpha-1 flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-nowrap text-black transition duration-150 ease-in-out hover:bg-white/80 focus:bg-white/90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 active:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:aria-pressed:cursor-default disabled:aria-pressed:opacity-100"
              >
                {t("cta.request-help")}
              </Link>
              <Link
                href="#"
                className="focus-visible:outline-surface-border-alpha-1 flex h-10 items-center justify-center gap-2 rounded-lg border border-white bg-black px-6 py-3 text-sm font-medium text-nowrap text-white transition duration-150 ease-in-out hover:bg-white/10 focus:bg-white/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 active:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:aria-pressed:cursor-default disabled:aria-pressed:opacity-100"
              >
                {t("cta.offer-help")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
