import {
  LoginDto,
  SignupDto,
  signupSchema,
  loginApiSchema,
} from "./auth.types";
import { client } from "@/lib/api/client";
import { endpointPath } from "@/lib/api/endpoints";

export async function loginRequest(
  dto: LoginDto,
): Promise<{ accessToken: string }> {
  const parsed = loginApiSchema.safeParse(dto);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const res = await client.post(endpointPath.AUTH.LOGIN, dto);

  return res.data;
}

export async function signupRequest(
  dto: Omit<SignupDto, "remember">,
): Promise<{ accessToken: string }> {
  const parsed = signupSchema.safeParse(dto);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const res = await client.post(endpointPath.AUTH.SIGNUP, dto);

  return res.data;
}
