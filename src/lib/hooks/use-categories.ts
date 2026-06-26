"use client";

import { getCategories } from "@/features/categories/categories.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((s) => s.categories.categories);
  const status = useAppSelector((s) => s.categories.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCategories());
    }
  }, [dispatch, status]);

  return {
    categories,
    loading: status === "loading",
    loaded: status === "success",
    error: status === "error",
  };
}
