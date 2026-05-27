"use client";

import { CategorySelector } from "@/features/categories/components/category-selector";
import { useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "../advert.slice";
import { TypeSelector } from "./type-selector";
import { PriceSlider } from "./price-slider";
import { useState } from "react";

export function AdvertFilters() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const filters = useAppSelector((s) => s.adverts);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.priceRange?.min ?? 0,
    filters.priceRange?.max ?? 9999,
  ]);

  function updateFilter(key: string, value: any) {
    const newFilters = { ...filters, [key]: value };

    dispatch(setFilters({ [key]: value }));

    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([k, v]) => {
      if (k === "limit") {
        return;
      }

      if (v === null || v === undefined || v === "") {
        return;
      }

      if (typeof v === "object") {
        Object.entries(v).forEach(([subKey, subValue]) => {
          params.set(subKey, String(subValue));
        });

        return;
      }

      params.set(k, String(v));
    });

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="bg-card sticky top-[73px] z-40 w-full border-b md:top-[89px]">
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <CategorySelector
              value={filters.category}
              onValueChange={(value) => {
                updateFilter("category", value);
              }}
            />
            <TypeSelector
              value={
                filters.isOffer === null
                  ? null
                  : filters.isOffer
                    ? "offer"
                    : "request"
              }
              onValueChange={(value) => {
                if (value === null) {
                  updateFilter("isOffer", null);
                }
                if (value === "offer") {
                  updateFilter("isOffer", true);
                }
                if (value === "request") {
                  updateFilter("isOffer", false);
                }
              }}
            />
            <PriceSlider
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value);
              }}
              onValueCommitted={([min, max]) => {
                updateFilter("priceRange", { min, max });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
