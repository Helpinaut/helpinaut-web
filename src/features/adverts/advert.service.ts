import { client } from "@/lib/api/client";
import { AdvertFilters } from "./advert.slice";
import { endpointPath } from "@/lib/api/endpoints";

export async function getAdverts(filters: AdvertFilters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  const res = await client.get(
    `${endpointPath.ADVERTS.BASE}?${params.toString()}`,
  );

  return res.data;
}
