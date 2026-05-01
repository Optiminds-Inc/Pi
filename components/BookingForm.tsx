export function BookingForm({ className }: { className?: string }) {
  return (
    <div
      className={["card-elevated p-10", className]
        .filter(Boolean)
        .join(" ")}
    >
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
      <input type={type} placeholder={placeholder} className="input-line" />
    </label>
  );
}
