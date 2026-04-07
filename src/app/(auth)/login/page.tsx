"use client";

import { Logo } from "@/components/assets/logo";
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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/features/auth/auth.slice";
import { LoginDto, loginSchema } from "@/features/auth/auth.types";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Home, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<LoginDto>({
    defaultValues: {
      email: "",
      password: "",
      // remember: true,
    },
    resolver: zodResolver(loginSchema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  async function onSubmit(data: LoginDto) {
    const res = await dispatch(login(data));

    if (login.fulfilled.match(res)) {
      form.reset();
      toast.success("Login successfully", {
        description: JSON.stringify(data, null, 2),
        className: "whitespace-pre-wrap font-mono",
      });
      //router.push("/");
    } else {
      toast.error(res.payload as string);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <div className="mx-4 w-full max-w-md pb-0">
        <Card className="mb-4">
          <CardHeader className="mt-4 mb-2 space-y-1 text-center">
            <div className="flex justify-center">
              <Link href="/" aria-label="Helpinaut homepage">
                <Logo />
              </Link>
            </div>
            <CardTitle className="text-2xl font-semibold text-balance">
              Sign in to Helpinaut
            </CardTitle>
            <CardDescription className="text-muted-foreground text-pretty">
              Enter your credentials to access your account.
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
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          autoComplete="email"
                          className="peer ps-9"
                          aria-describedby={
                            fieldState.invalid
                              ? `${field.name}-error`
                              : undefined
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
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Link
                          href="/forgot-password"
                          className="text-primary hover:underline"
                        >
                          Forgot password?
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
                            fieldState.invalid
                              ? `${field.name}-error`
                              : undefined
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
                {/* <Controller
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
                      checked={true} //checked={value}
                      onCheckedChange={onChange}
                    />
                    <FieldLabel
                      htmlFor={field.name}
                      className="leading-none font-normal"
                    >
                      Remember me
                    </FieldLabel>
                  </Field>
                )}
              /> */}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Spinner data-icon="inline-start" aria-hidden="true" />
                      <span>Processing</span>
                    </>
                  ) : (
                    <span>Sign in</span>
                  )}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-4!">
            <p className="text-muted-foreground text-center">
              New to Helpinaut?{" "}
              <Link className="text-primary hover:underline" href="/signup">
                Create an account
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
