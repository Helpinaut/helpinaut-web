import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Baloo_Da_2 } from "next/font/google";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });
const steps = [
  {
    index: "1",
    title: "Create an account",
    description: "Get access to post, chat and save your favorite listings.",
  },
  {
    index: "2",
    title: "Advertise yourself",
    description: "Tell others what you need or what you can do for them.",
  },
  {
    index: "3",
    title: "Get in touch",
    description:
      "Find the best deals nearby, contact other users or receive their offers.",
  },
  {
    index: "4",
    title: "Lend a hand",
    description: "Come to an agreement and set a time to get things done.",
  },
];

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
