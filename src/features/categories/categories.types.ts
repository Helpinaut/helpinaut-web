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

export const categoryValueSchema = z.enum(categoryValues);

export type CategoryValue = z.infer<typeof categoryValueSchema>;

export const categorySchema = z.object({
  value: categoryValueSchema,
  // label: z.string().nonempty(),
});

export type Category = z.infer<typeof categorySchema>;
