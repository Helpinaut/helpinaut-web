"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategorySelector } from "@/features/categories/components/category-selector";
import { useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation";
import { setFilters } from "../advert.slice";
import { TypeSelector } from "./type-selector";

export function AdvertFilters() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filters = useAppSelector((s) => s.adverts);

  function updateFilter(key: string, value: any) {
    const newFilters = { ...filters, [key]: value };

    dispatch(setFilters({ [key]: value }));

    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (key === "limit") {
        return;
      }

      if (value !== null && value !== undefined && value !== "") {
        params.set(key, String(value));
      }
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
          </div>
        </div>
      </div>
    </div>
  );
}
