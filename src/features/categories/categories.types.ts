import z from "zod";

export const categoryValues = [
  "BEAUTY",
  "CARE",
  "CARPENTRY",
  "CLASSES",
  "CLEANING",
  "ELECTRICIAN",
  "GARDENING",
  "MEDIA",
  "PAINTING",
  "PETS",
  "PLUMBING",
  "REPAIRS",
  "RESTORATION",
  "TECHNOLOGY",
  "TRAINING",
  "TRANSPORT",
] as const;

export const categoryValuesSchema = z.enum(categoryValues);

export type CategoryValue = z.infer<typeof categoryValuesSchema>;

export const categorySchema = z.object({
  value: categoryValuesSchema,
});

export type Category = z.infer<typeof categorySchema>;
