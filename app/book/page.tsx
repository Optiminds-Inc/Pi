import Link from "next/link";
import { OnboardingSteps } from "@/components/OnboardingSteps";
import { OutcomeBlock } from "@/components/OutcomeBlock";
import { BookingForm } from "@/components/BookingForm";

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
                className="font-display mb-7 text-ink-1"
                style={{
                  fontSize: "clamp(28px, 2.9vw, 38px)",
                  lineHeight: "1.15",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                30 minutes.
                <br />
                <span className="whitespace-nowrap text-ink-3">
                  To onboard your AI marketing team.
                </span>
              </h1>
              <p className="mb-10 max-w-[480px] text-[16px] leading-[1.65] text-ink-2">
                One call to lock in your strategy. We handle every setup — your
                website, your agents, your launch — so you don't have to.
              </p>

              <div className="mb-12">
                <OutcomeBlock />
              </div>

              <OnboardingSteps heading="What we set up for you" showAfter={false} />
            </div>

            <BookingForm className="animate-scale-in self-start md:sticky md:top-[80px]" />
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
