"use client";

import { Logo } from "@/components/assets/logo";
import { PasswordStrengthMeter } from "@/components/shared/password-strength-meter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signup } from "@/features/auth/auth.slice";
import { SignupDto, signupSchema } from "@/features/auth/auth.types";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Home, Lock, Mail, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<SignupDto>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeatedPassword: "",
      postalCode: "",
    },
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  async function onSubmit(data: SignupDto) {
    const res = await dispatch(signup(data));

    if (signup.fulfilled.match(res)) {
      form.reset();
      router.push("/");
    } else {
      toast.error(res.payload?.message);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <div className="mx-4 w-full max-w-md pb-0">
        <Card className="mb-4">
          <CardHeader className="mt-4 mb-2 space-y-1 text-center">
            <div className="mb-4 flex justify-center">
              <Logo aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl font-semibold text-balance">
              Create your account
            </CardTitle>
            <CardDescription className="text-muted-foreground text-pretty">
              Welcome! Create your account to get started.
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
                      <FieldLabel htmlFor={field.name}>
                        Email <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.invalid
                              ? `${field.name}-error`
                              : undefined
                          }
                          autoComplete="email"
                          className="peer ps-9"
                          inputMode="email"
                          type="email"
                          required
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
                      <FieldDescription>
                        This email address will be used for login and contact
                        yous. We will not share it with anyone else.
                      </FieldDescription>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Username <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-describedby={
                            fieldState.invalid
                              ? `${field.name}-error`
                              : undefined
                          }
                          aria-invalid={fieldState.invalid}
                          className="peer ps-9"
                          type="text"
                          required
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                          <User size={16} aria-hidden="true" />
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
                          Password <span className="text-destructive">*</span>
                        </FieldLabel>
                      </div>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-describedby={
                            fieldState.invalid
                              ? `${field.name}-error`
                              : undefined
                          }
                          aria-invalid={fieldState.invalid}
                          autoComplete="new-password"
                          className="peer ps-9"
                          type={isPasswordVisible ? "text" : "password"}
                          required
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
                      {field.value && (
                        <PasswordStrengthMeter password={field.value} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="repeatedPassword"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor={field.name}>
                          Confirm password{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>
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
                            fieldState.invalid
                              ? `${field.name}-error`
                              : undefined
                          }
                          required
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

                <Controller
                  control={form.control}
                  name="postalCode"
                  render={({ field, fieldState }) => {
                    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 5);
                      field.onChange(digits);
                    };

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Postal code{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            aria-describedby={
                              fieldState.invalid
                                ? `${field.name}-error`
                                : undefined
                            }
                            autoComplete="postal-code"
                            inputMode="numeric"
                            className="peer ps-9"
                            maxLength={5}
                            onChange={handleChange}
                            required
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                            <MapPin size={16} aria-hidden="true" />
                          </div>
                        </div>
                        {fieldState.invalid && (
                          <FieldError
                            id={`${field.name}-error`}
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    );
                  }}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Spinner data-icon="inline-start" aria-hidden="true" />
                      <span>Processing</span>
                    </>
                  ) : (
                    <span>Create free account</span>
                  )}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-4!">
            <p className="text-muted-foreground text-center">
              Already have an account?{" "}
              <Link className="text-primary hover:underline" href="/login">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        <Link
          href="/"
          className="text-primary flex items-center justify-center space-x-2 text-sm hover:underline"
        >
          <Home size={16} />{" "}
          <span className="leading-none font-normal">Back to homepage</span>
        </Link>
      </div>
    </main>
  );
}
