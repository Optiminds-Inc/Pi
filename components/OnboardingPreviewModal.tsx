"use client";

import Link from "next/link";
import { useEffect } from "react";
import { OnboardingSteps } from "./OnboardingSteps";

export function OnboardingPreviewModal({
  open,
  onClose,
  reason,
}: {
  open: boolean;
  onClose: () => void;
  reason?: string;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 sm:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[12px] border border-line bg-paper p-8 shadow-[var(--shadow-md)]"
      >
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow">Set up during onboarding</div>
            <h2
              className="font-display mt-3 text-ink-1"
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
            >
              {reason ?? "30 minutes. We do every setup."}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-4 transition-colors duration-150 hover:bg-paper-2 hover:text-ink-1"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <OnboardingSteps heading="What we do" compact />

        <Link
          href="/book"
          onClick={onClose}
          className="btn-primary group mt-8 w-full justify-center"
        >
          Book onboarding call
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
