import { client } from "@/lib/api/client";
import { User } from "./user.types";
import { endpointPath } from "@/lib/api/endpoints";

export async function getMeRequest(): Promise<User> {
  const res = await client.get(endpointPath.USERS.ME);

  return res.data;
}
