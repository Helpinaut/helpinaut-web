import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Baloo_Da_2 } from "next/font/google";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

export async function HowItWorksBanner() {
  const t = await getTranslations("HomePage.how-it-works-banner");

  return (
    <section className="bg-muted/50 py-32" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4">
        <h3
          className={cn(
            balooDa2.className,
            "text-3xl leading-[1.15] font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          )}
        >
          {t("heading")}
        </h3>
        <div className="mt-8 grid gap-12 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="bg-primary text-primary-foreground mb-4 flex size-12 items-center justify-center rounded-full font-semibold">
                {i + 1}
              </div>
              <h4 className="text-xl font-semibold">
                {t(`steps.${i + 1}.title`)}
              </h4>
              <p className="text-muted-foreground mt-5">
                {t(`steps.${i + 1}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
