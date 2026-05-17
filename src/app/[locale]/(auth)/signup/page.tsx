import { SignupForm } from "@/features/auth/components/signup-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SignupPage" });

  return {
    title: t("title"),
  };
}

export default function SignupPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <SignupForm />
    </main>
  );
}
