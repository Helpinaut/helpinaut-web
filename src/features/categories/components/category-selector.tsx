"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/lib/hooks/use-categories";

type Props = {
  value?: string | null;
  onValueChange: (value: string | null) => void;
};

export function CategorySelector({ value, onValueChange }: Props) {
  const { categories, loading } = useCategories();

  return (
    <Select value={value} onValueChange={onValueChange} items={categories}>
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="All categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select service category</SelectLabel>
          <SelectSeparator />
          {loading && (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          )}
          <SelectItem value={null}>All categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
