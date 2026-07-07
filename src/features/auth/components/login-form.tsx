"use client";

import { Logo } from "@/components/assets/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api/errors";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Eye, EyeOff, Home, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Baloo_Da_2 } from "next/font/google";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "../auth.slice";
import { LoginFormValues, loginFormSchema } from "../auth.types";

const balooDa2 = Baloo_Da_2({ subsets: ["latin"] });

export function LoginForm() {
  const t = useTranslations("LoginPage");
  const tValidation = useTranslations("response.validation");
  const tError = useTranslations("response.error");
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
    resolver: zodResolver(loginFormSchema(tValidation)),
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function onSubmit(data: LoginFormValues) {
    try {
      await dispatch(login(data)).unwrap();
      form.reset();
      router.push("/");
    } catch (error) {
      const apiError = error as ApiError;

      toast.error(
        tError.has(apiError.code)
          ? tError(apiError.code)
          : tError("UNKNOWN_ERROR"),
      );
    }
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-9">
      <Logo />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h2 className="text-center text-3xl leading-tight tracking-tight">
          {t("heading")}{" "}
          <span className={cn(balooDa2.className, "text-4xl font-bold")}>
            Helpinaut
          </span>
        </h2>
        <Button
          variant="outline"
          type="button"
          className="flex items-center gap-2"
        >
          <SiGoogle />
          {t("google")}
        </Button>
        <FieldSeparator className="my-1">{t("separator")}</FieldSeparator>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>{t("email")}</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      className="peer ps-9"
                      aria-describedby={
                        fieldState.invalid ? `${field.name}-error` : undefined
                      }
                      inputMode="email"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                      <Mail size={16} aria-hidden="true" />
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      id={`${field.name}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <div className="flex flex-col items-baseline gap-5">
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {t("password")}
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={isPasswordVisible ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        autoComplete="current-password"
                        className="peer ps-9"
                        aria-describedby={
                          fieldState.invalid ? `${field.name}-error` : undefined
                        }
                      />
                      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                        <Lock size={16} aria-hidden="true" />
                      </div>
                      <button
                        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          isPasswordVisible ? t("aria.hide") : t("aria.show")
                        }
                        aria-pressed={isPasswordVisible}
                        aria-controls={field.name}
                      >
                        {isPasswordVisible ? (
                          <EyeOff size={16} aria-hidden="true" />
                        ) : (
                          <Eye size={16} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        id={`${field.name}-error`}
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                  <Link
                    href="/forgot-password"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "px-0 text-base",
                    )}
                  >
                    {t("forgot-password")}
                  </Link>
                </div>
              )}
            />
            <FieldSeparator />
            <Controller
              control={form.control}
              name="remember"
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                  className="flex items-center space-y-0.5"
                >
                  <Checkbox
                    {...field}
                    id={field.name}
                    checked={value}
                    onCheckedChange={onChange}
                  />
                  <FieldLabel
                    htmlFor={field.name}
                    className="leading-none font-normal"
                  >
                    {t("remember-me")}
                  </FieldLabel>
                </Field>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Spinner data-icon="inline-start" aria-hidden="true" />
                  <span>{t("processing")}</span>
                </>
              ) : (
                <span>{t("sign-in")}</span>
              )}
            </Button>
          </FieldGroup>
        </form>
        <div className="flex items-center justify-center">
          <span className="text-muted-foreground">{t("new")}</span>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ variant: "link" }),
              "px-0 pl-1 text-base",
            )}
          >
            {t("sign-up")}
          </Link>
        </div>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "link" }), "text-base")}
        >
          <Home size={16} />{" "}
          <span className="leading-none font-normal">
            {t("back-to-homepage")}
          </span>
        </Link>
      </div>
    </div>
  );
}
