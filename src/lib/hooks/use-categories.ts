"use client";

import { getCategories } from "@/features/categories/categories.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((s) => s.categories.categories);
  const loading = useAppSelector((s) => s.categories.status === "loading");

  useEffect(() => {
    if (!categories.length && !loading) {
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

  return { categories, loading };
}
