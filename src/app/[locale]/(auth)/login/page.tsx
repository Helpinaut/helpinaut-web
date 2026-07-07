import AuthHeader from "@/features/auth/components/auth-header";
import { LoginForm } from "@/features/auth/components/login-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LoginPage" });

  return {
    title: t("title"),
  };
}

export default function LoginPage() {
  return (
    <main className="bg-background flex min-h-dvh flex-col">
      <AuthHeader />
      <div className="flex flex-1 overflow-hidden p-4 pt-0">
        <div className="mx-auto hidden w-full max-w-7xl gap-4 overflow-hidden lg:flex">
          <div className="relative flex w-full overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-red-950"></div>
          </div>
        </div>
        <div className="relative flex min-h-0 w-full flex-col overflow-y-auto rounded-lg lg:w-full">
          <div className="relative flex w-full flex-1 flex-col items-center justify-center px-6 py-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
