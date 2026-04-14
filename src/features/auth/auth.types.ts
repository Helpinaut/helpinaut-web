import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email format")),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be longer than 8 characters"),
  remember: z.boolean(),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.email("Invalid email format").nonempty("Email is required"),
    username: z
      .string()
      .nonempty("Username is required")
      .max(16, "Username can not be longer than 16 characters"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be longer than 8 characters"),
    repeatedPassword: z
      .string()
      .nonempty("Please repeat your password")
      .min(8, "Password must be longer than 8 characters"),
    postalCode: z
      .string()
      .nonempty("Postal code is required")
      .length(5, "Postal code must be exactly 5 digits")
      .regex(/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/, "Invalid Spanish postal code"),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    error: "Passwords do not match",
    path: ["repeatedPassword"],
  });

export type SignupDto = z.infer<typeof signupSchema>;

export type User = {
  id: string;
  email: string;
  username: string;
  postalCode: string;
  adverts: any[]; //TODO change to Advert[],
  favorites: any[]; //TODO change to Favorite[]
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
};
