"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdvertFilters } from "./advert-filters";
import { AdvertsList } from "./adverts-list";
import { useEffect } from "react";

export function AdvertsFeed() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.adverts);

  // useEffect(() => {
  //   dispatch(getAdverts(filters));
  // }, [dispatch, filters]);

  return (
    <>
      <AdvertFilters />
      <section className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* <AdvertsList adverts={adverts.item} /> */}
          {/* <AdvertsPagination page={adverts.page} totalPages={adverts.totalPages}/> */}
        </div>
      </section>
    </>
  );
}
