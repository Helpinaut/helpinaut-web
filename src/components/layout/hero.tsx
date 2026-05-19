import { HandCoins, HandPlatter, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="via-background w-full bg-linear-to-tr from-sky-500/10 to-purple-500/10 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-indigo-600 dark:bg-[#1C1830] dark:text-indigo-400">
            <Sparkles size={16} />
            <span className="text-sm">{t("badge")}</span>
          </div>
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
            {t.rich("title", {
              strong: (chunks) => <strong>{chunks}</strong>,
              br: () => <br />,
              highlight: (chunks) => (
                <span className="text-indigo-600 dark:text-indigo-400">
                  {chunks}
                </span>
              ),
            })}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl text-lg md:text-xl">
            {t("description")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              <HandCoins aria-hidden="true" />
              {t("cta.request-help")}
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-lg">
              <HandPlatter aria-hidden="true" />
              {t("cta.offer-help")}
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 text-center md:gap-16">
            <div>
              <div className="mb-2 text-3xl text-indigo-600 md:text-4xl dark:text-indigo-400">
                +20K
              </div>
              <div className="text-muted-foreground text-sm">
                {t("stats.active-adverts")}
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl text-indigo-600 md:text-4xl dark:text-indigo-400">
                +5K
              </div>
              <div className="text-muted-foreground text-sm">
                {t("stats.users")}
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl text-indigo-600 md:text-4xl dark:text-indigo-400">
                +15
              </div>
              <div className="text-muted-foreground text-sm">
                {t("stats.categories")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
