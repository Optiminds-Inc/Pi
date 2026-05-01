import { ONBOARDING_OUTCOME } from "@/lib/onboarding";

export function OutcomeBlock() {
  return (
    <div className="rounded-[12px] border border-line bg-paper-2 p-7">
      <div className="eyebrow">The outcome</div>
      <h2
        className="font-display mt-3 text-balance text-ink-1"
        style={{
          fontSize: "clamp(22px, 2.4vw, 28px)",
          lineHeight: "1.25",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        {ONBOARDING_OUTCOME.headline}
      </h2>
      <p className="mt-4 text-[15px] leading-[1.65] text-ink-2">
        {ONBOARDING_OUTCOME.body}{" "}
        <span className="font-medium text-ink-1">
          {ONBOARDING_OUTCOME.emphasis}
        </span>
      </p>
    </div>
  );
}
