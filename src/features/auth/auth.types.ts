import { useTranslations } from "next-intl";
import z from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty().pipe(z.email()),
  password: z.string().nonempty().min(8),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const loginFormSchema = (t: ReturnType<typeof useTranslations>) =>
  loginSchema.extend({
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
    email: z.string().nonempty().pipe(z.email()),
    username: z.string().nonempty().max(16),
    password: z.string().nonempty().min(8),
    repeatedPassword: z.string().nonempty().min(8),
    postalCode: z
      .string()
      .nonempty()
      .length(5)
      .regex(/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
  })
  .refine((data) => data.password === data.repeatedPassword);

export type SignupDto = z.infer<typeof signupSchema>;

export const signupFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      email: z
        .string()
        .nonempty(t("email.required"))
        .pipe(z.email(t("email.invalid"))),
      username: z
        .string()
        .nonempty(t("username.required"))
        .max(16, t("username.max")),
      password: z
        .string()
        .nonempty(t("password.required"))
        .min(8, t("password.min")),
      repeatedPassword: z
        .string()
        .nonempty(t("password.repeated"))
        .min(8, t("password.min")),
      postalCode: z
        .string()
        .nonempty(t("postal-code.required"))
        .length(5, t("postal-code.length"))
        .regex(/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/, t("postal-code.regex")),
    })
    .refine((data) => data.password === data.repeatedPassword, {
      error: t("password.matching"),
      path: ["repeatedPassword"],
    });

export type SignupFormValues = z.infer<ReturnType<typeof signupFormSchema>>;
