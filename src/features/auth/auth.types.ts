import z from "zod";

export const loginApiSchema = z.object({
  email: z.string().nonempty().pipe(z.email()),
  password: z.string().nonempty().min(8),
});

export type LoginDto = z.infer<typeof loginApiSchema>;

export const loginFormSchema = (t: (key: string) => string) =>
  loginApiSchema.extend({
    email: z
      .string()
      .nonempty(t("email.required"))
      .pipe(z.email(t("email.invalid"))),
    password: z
      .string()
      .nonempty(t("password.required"))
      .min(8, t("password.min")),
    remember: z.boolean(),
  });

export type LoginFormValues = z.infer<ReturnType<typeof loginFormSchema>>;

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
