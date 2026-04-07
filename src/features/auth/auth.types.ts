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
    repeatPassword: z
      .string()
      .nonempty("Please repeat your password")
      .min(8, "Password must be longer than 8 characters"),
    postalCode: z
      .string()
      .nonempty("Invalid Spanish code format")
      .regex(/^\d{5}$/),
  })
  .refine((data) => data.password === data.repeatPassword, {
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
