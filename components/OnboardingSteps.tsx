import { ONBOARDING_STEPS, ONBOARDING_OUTCOME } from "@/lib/onboarding";

export function OnboardingSteps({
  heading = "What we do",
  compact = false,
  showAfter = true,
}: {
  heading?: string;
  compact?: boolean;
  showAfter?: boolean;
}) {
  return (
    <div>
      <div className="eyebrow">{heading}</div>
      <ol className={compact ? "mt-5 space-y-4" : "mt-6 space-y-6"}>
        {ONBOARDING_STEPS.map((s) => (
          <li key={s.n} className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-paper-2 font-display text-[14px] font-medium tabular text-ink-2">
              {s.n}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-[15px] font-medium leading-snug text-ink-1">
                {s.title}
              </h3>
              <p
                className={
                  compact
                    ? "mt-1.5 text-[13px] leading-[1.55] text-ink-3"
                    : "mt-1.5 text-[13.5px] leading-[1.6] text-ink-3"
                }
              >
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      {showAfter && (
        <div
          className={
            compact
              ? "mt-7 border-t border-line pt-5"
              : "mt-9 border-t border-line pt-7"
          }
        >
          <div className="eyebrow">After that</div>
          <p
            className={
              compact
                ? "mt-2.5 text-[13.5px] leading-[1.6] text-ink-2"
                : "mt-3 text-[14.5px] leading-[1.65] text-ink-2"
            }
          >
            {ONBOARDING_OUTCOME.headline}{" "}
            {ONBOARDING_OUTCOME.body}{" "}
            <span className="font-medium text-ink-1">
              {ONBOARDING_OUTCOME.emphasis}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
