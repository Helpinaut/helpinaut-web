import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/features/auth/components/login-form";

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
    <main className="flex min-h-dvh items-center justify-center">
      <LoginForm />
    </main>
  );
}
