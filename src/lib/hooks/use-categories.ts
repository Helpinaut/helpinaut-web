"use client";

import { getCategories } from "@/features/categories/categories.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((s) => s.categories.categories);

  useEffect(() => {
    if (!categories.length) dispatch(getCategories());
  }, [dispatch, categories.length]);

  return { categories };
}
