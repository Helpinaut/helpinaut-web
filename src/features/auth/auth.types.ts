import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be longer than 8 characters")
    .nonempty("Password is required"),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.email("Invalid email format").nonempty("Email is required"),
    username: z
      .string()
      .max(16, "Username can not be longer than 16 characters")
      .nonempty("Username is required"),
    password: z
      .string()
      .min(8, "Password must be longer than 8 characters")
      .nonempty("Password is required"),
    repeatPassword: z
      .string()
      .min(8, "Password must be longer than 8 characters")
      .nonempty("Please repeat your password"),
    postalCode: z
      .string()
      .regex(/^\d{5}$/)
      .nonempty("Invalid Spanish code format"),
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
