import { client } from "@/lib/api/client";
import { Category } from "./categories.types";
import { endpointPath } from "@/lib/api/endpoints";

export async function getCategoriesRequest(): Promise<Category[]> {
  const res = await client.get(endpointPath.ADVERTS.CATEGORIES);

  return res.data;
}
