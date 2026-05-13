import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  const pathname = new URL(request.url).pathname;
  const locale =
    routing.locales.find(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}`),
    ) ?? routing.defaultLocale;

  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};
