"use client";

import { Logo } from "@/components/assets/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { LoginFormValues, loginFormSchema } from "../auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store/hooks";
import { Link, useRouter } from "@/i18n/navigation";
import { login } from "../auth.slice";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Home, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";
import { ApiError } from "@/lib/api/errors";

export function LoginForm() {
  const t = useTranslations("LoginPage");
  const tValidation = useTranslations("validation");
  const tError = useTranslations("errors");
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
    <div className="mx-4 w-full max-w-md pb-0">
      <Card className="mb-4">
        <CardHeader className="mt-4 mb-2 space-y-1 text-center">
          <div className="mb-4 flex justify-center">
            <Logo aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-semibold text-balance">
            {t("sign-in-to-helpinaut")}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-pretty">
            {t("enter-your-credentials")}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>
                        {t("password")}
                      </FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-primary hover:underline"
                      >
                        {t("forgot-password")}
                      </Link>
                    </div>
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
                          isPasswordVisible
                            ? "Hide password text"
                            : "Show password text"
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
        </CardContent>
        <CardFooter className="flex justify-center border-t py-4!">
          <p className="text-muted-foreground text-center">
            {t("new-to-helpinaut")}{" "}
            <Link className="text-primary hover:underline" href="/signup">
              {t("create-an-account")}
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Link
        href="/"
        className="text-primary flex items-center justify-center space-x-2 text-sm hover:underline"
      >
        <Home size={16} />{" "}
        <span className="leading-none font-normal">
          {t("back-to-homepage")}
        </span>
      </Link>
    </div>
  );
}
