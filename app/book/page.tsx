import Link from "next/link";
import { OnboardingSteps } from "@/components/OnboardingSteps";

export default function BookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="glass-nav sticky top-0 z-30">
        <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-10">
          <Link
            href="/"
            className="font-logo text-[22px] leading-none text-ink-1 transition-opacity duration-150 hover:opacity-70"
          >
            Pi
          </Link>
          <Link
            href="/"
            className="text-[13px] text-ink-3 transition-colors duration-150 hover:text-ink-1"
          >
            Back
          </Link>
        </div>
      </header>

      <main className="flex flex-1">
        <section className="mx-auto w-full max-w-[1200px] px-10 py-20">
          <div className="grid gap-14 md:grid-cols-[1.05fr_1fr] md:gap-20">
            <div className="animate-fade-in">
              <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-line bg-paper-2 px-3 py-1 text-[11px] uppercase tracking-[0.04em] font-medium text-ink-3">
                Onboarding call
              </div>
              <h1
                className="font-display mb-8 text-ink-1"
                style={{
                  fontSize: "clamp(32px, 3.6vw, 48px)",
                  lineHeight: "1.1",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                30 minutes.
                <br />
                <span className="text-ink-3">Then your AI team is live.</span>
              </h1>
              <p className="mb-10 max-w-[460px] text-[16px] leading-[1.65] text-ink-2">
                One call. By the time we hang up, your AI marketing team is
                running. You bring the firm; we do every setup.
              </p>

              <OnboardingSteps />

              <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-4">
                <span>Run by a Pi partner</span>
                <span className="text-ink-5">·</span>
                <span>No SDR</span>
                <span className="text-ink-5">·</span>
                <span>No prep required</span>
              </div>
            </div>

            <div className="card-elevated animate-scale-in self-start p-10 md:sticky md:top-[80px]">
              <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-3">
                Pick a time
              </div>
              <div className="grid gap-6">
                <Field label="Firm" placeholder="Hayes Mitchell PI Law" />
                <Field label="Your name" placeholder="Anna Mitchell" />
                <Field
                  label="Email"
                  placeholder="anna@hayesmitchelllaw.com"
                  type="email"
                />
                <Field label="Phone" placeholder="(713) 555-0142" type="tel" />

                <div>
                  <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-3">
                    Available next week
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Mon · 10:00 AM",
                      "Mon · 2:30 PM",
                      "Tue · 11:00 AM",
                      "Wed · 9:00 AM",
                      "Wed · 3:00 PM",
                      "Thu · 1:00 PM",
                    ].map((t) => (
                      <button key={t} type="button" className="chip justify-center">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="button" className="btn-primary group mt-2 self-start">
                  Confirm onboarding call
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </button>
                <p className="text-[12.5px] text-ink-4">
                  All times Central. We'll send a calendar invite right after.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-10 py-10 text-[12px] text-ink-4">
          <span className="font-logo text-ink-3">Pi</span>
          <span className="tabular">© 2026</span>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="input-line"
      />
    </label>
  );
}
