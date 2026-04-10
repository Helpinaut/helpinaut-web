import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";

export function PasswordStrengthMeter({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "At least 1 number", valid: /\d/.test(password) },
    { label: "At least 1 lowercase letter", valid: /[a-z]/.test(password) },
    { label: "At least 1 uppercase letter", valid: /[A-Z]/.test(password) },
    {
      label: "At least 1 special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
  const score = checks.filter((check) => check.valid).length;
  const strengthLabel = (score: number) => {
    if (!score) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    if (score >= 4) return "Strong password";
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
          {strengthLabel(score)}. Should contain:
        </span>
      </div>
      <div className="space-y-1" aria-label="Password requirements">
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
                {item.valid ? "Valid" : "Invalid"}:
              </span>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
