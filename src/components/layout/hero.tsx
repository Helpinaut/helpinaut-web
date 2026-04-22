import { Plus, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="via-background w-full bg-linear-to-tr from-sky-500/10 to-purple-500/10 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-indigo-600 dark:bg-[#1C1830] dark:text-indigo-400">
            <Sparkles size={16} />
            <span className="text-sm">
              Connect with neighbors and professionals in your area
            </span>
          </div>
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
            Do you <strong>need a hand</strong>
            <br />
            or <strong>have one to offer</strong>?
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Tell those around you
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl text-lg md:text-xl">
            Hundreds of people post and find local services every day. Plumbers,
            electricians, dog walkers, and much more. All right in your
            neighborhood.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              <Plus size={20} />
              <span>Post an advert</span>
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-lg">
              Browse all adverts
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 text-center md:gap-16">
            <div>
              <div className="mb-2 text-3xl text-indigo-600 md:text-4xl dark:text-indigo-400">
                +20K
              </div>
              <div className="text-muted-foreground text-sm">
                Actives adverts
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl text-indigo-600 md:text-4xl dark:text-indigo-400">
                +5K
              </div>
              <div className="text-muted-foreground text-sm">Users</div>
            </div>
            <div>
              <div className="mb-2 text-3xl text-indigo-600 md:text-4xl dark:text-indigo-400">
                +15
              </div>
              <div className="text-muted-foreground text-sm">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
