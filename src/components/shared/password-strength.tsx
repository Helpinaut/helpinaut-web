import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  password: string;
  t: ReturnType<typeof useTranslations>;
};

export function PasswordStrength({ password, t }: Props) {
  const checks = [
    { label: t("at-least-chars"), valid: password.length >= 8 },
    { label: t("at-least-number"), valid: /\d/.test(password) },
    { label: t("at-least-lower"), valid: /[a-z]/.test(password) },
    { label: t("at-least-upper"), valid: /[A-Z]/.test(password) },
    {
      label: t("at-least-special"),
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
  const score = checks.filter((check) => check.valid).length;
  const strengthLabel = (score: number) => {
    if (!score) return t("enter-a-password");
    if (score <= 2) return t("weak");
    if (score === 3) return t("medium");
    if (score >= 4) return t("strong");
  };
  const strengthColor =
    score === 1
      ? "text-red-500"
      : score === 2
        ? "text-orange-500"
        : score === 3
          ? "text-yellow-500"
          : score === 4
            ? "text-lime-500"
            : "text-green-500";
  return (
    <div className="mt-1 space-y-3">
      <div aria-live="polite">
        <Progress
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={checks.length}
          aria-valuetext={strengthLabel(score)}
          className={cn("mb-2 h-1 rounded-full transition-all", strengthColor)}
          value={(score / checks.length) * 100}
        />
        <span className="text-muted-foreground">
          {strengthLabel(score)}. {t("should-contain")}
        </span>
      </div>
      <div className="space-y-1" aria-label={t("aria-password-requirements")}>
        {checks.map((item) => (
          <div key={item.label} className="flex items-center space-x-2">
            {item.valid ? (
              <Check size={12} className="text-green-500" aria-hidden="true" />
            ) : (
              <X
                size={12}
                className="text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "transition-colors",
                item.valid ? "text-green-500" : "text-muted-foreground",
              )}
            >
              <span className="sr-only">
                {item.valid ? t("sr-valid") : t("sr-invalid")}:
              </span>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
