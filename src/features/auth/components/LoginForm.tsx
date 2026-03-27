"use client";

import { TextField } from "@/components/ui/TextField";
import { FormEvent, useState } from "react";
import { LoginDto, loginSchema } from "../auth.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { login } from "../auth.slice";
import { FormError } from "@/components/shared/FormError";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector((s) => s.auth);
  const [form, setForm] = useState<LoginDto>({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = loginSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      parsed.error.issues.forEach((err) => {
        const key = String(err.path[0]);

        fieldErrors[key] = err.message;
      });

      setErrors(fieldErrors);

      return;
    }

    const result = await dispatch(login(parsed.data));

    if (login.fulfilled.match(result)) {
      router.push("/");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded bg-white p-6 shadow"
    >
      <h2 className="text-center text-2xl font-semibold">Login</h2>
      <TextField
        label="Email"
        type="email"
        value={form?.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        error={errors.email}
        placeholder="your@email.com"
      />
      <TextField
        label="Password"
        type="password"
        value={form?.password}
        onChange={(v) => setForm((f) => ({ ...f, password: v }))}
        error={errors.password}
        placeholder="••••••••"
      />
      <FormError message={error} />
      <Button type="submit" loading={status === "loading"}>
        Login
      </Button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500 underline">
          {" "}
          Sign up
        </a>
      </p>
    </form>
  );
}
