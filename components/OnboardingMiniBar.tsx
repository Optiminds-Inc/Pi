import { ONBOARDING_STEPS } from "@/lib/onboarding";

export function OnboardingMiniBar() {
  return (
    <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-md border border-line bg-paper-2 px-3.5 py-2 text-[12.5px] text-ink-2">
      <span className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-ink-4">
        In 30 min
      </span>
      {ONBOARDING_STEPS.map((s) => (
        <span key={s.n} className="inline-flex items-center gap-1.5">
          <CheckTiny />
          {s.label}
        </span>
      ))}
    </div>
  );
}

function CheckTiny() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <path
        d="M3 8.4l3 3L13 5"
        fill="none"
        stroke="var(--color-ink-1)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
