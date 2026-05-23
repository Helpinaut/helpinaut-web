import z from "zod";

export const categorySchema = z.object({
  value: z
    .string()
    .nonempty()
    .regex(/^[A-Z]+$/),
  label: z.string().nonempty(),
});

export type Category = z.infer<typeof categorySchema>;
