"use client";

import { useState } from "react";
import PageHeader, { HeaderButton } from "@/components/PageHeader";
import {
  type Connection,
  type ConnectionStatus,
  connections,
  firm,
  firmProfile,
  type FirmProfile,
  type TrackingNumber,
  type TrackingTestStatus,
  trackingNumbers,
} from "@/lib/mock";

type SetupState = {
  profile: FirmProfile;
  areas: Record<string, boolean>;
  radius: number;
};

const initialState: SetupState = {
  profile: firmProfile,
  areas: Object.fromEntries(firm.practiceAreas.map((p) => [p.id, p.on])),
  radius: firm.geo.radiusMiles,
};

function diffCount(a: SetupState, b: SetupState): number {
  let n = 0;
  if (JSON.stringify(a.profile) !== JSON.stringify(b.profile)) n++;
  if (a.radius !== b.radius) n++;
  for (const k of Object.keys(a.areas)) {
    if (a.areas[k] !== b.areas[k]) n++;
  }
  return n;
}

export default function SetupPage() {
  const [committed, setCommitted] = useState<SetupState>(initialState);
  const [draft, setDraft] = useState<SetupState>(initialState);
  const [editingFirm, setEditingFirm] = useState(false);

  const focusChanges =
    (committed.radius !== draft.radius ? 1 : 0) +
    Object.keys(committed.areas).filter(
      (k) => committed.areas[k] !== draft.areas[k],
    ).length;
  const focusDirty = focusChanges > 0;

  function commitFirm() {
    setCommitted({ ...committed, profile: draft.profile });
    setEditingFirm(false);
  }
  function cancelFirm() {
    setDraft({ ...draft, profile: committed.profile });
    setEditingFirm(false);
  }

  return (
    <>
      <PageHeader
        title="Setup"
        actions={
          focusDirty ? (
            <>
              <span className="text-[12px] text-warning">
                {focusChanges} unsaved {focusChanges === 1 ? "change" : "changes"}
              </span>
              <HeaderButton
                onClick={() =>
                  setDraft({
                    ...draft,
                    areas: committed.areas,
                    radius: committed.radius,
                  })
                }
              >
                Discard
              </HeaderButton>
              <HeaderButton
                primary
                onClick={() =>
                  setCommitted({
                    ...committed,
                    areas: draft.areas,
                    radius: draft.radius,
                  })
                }
              >
                Save changes
              </HeaderButton>
            </>
          ) : null
        }
      />

      <div className="mx-auto max-w-[920px] space-y-16 px-10 pt-10 pb-12">
        <FirmSection
          profile={draft.profile}
          editing={editingFirm}
          onChange={(profile) => setDraft({ ...draft, profile })}
          onEdit={() => setEditingFirm(true)}
          onSave={commitFirm}
          onCancel={cancelFirm}
        />
        <FocusSection
          areas={draft.areas}
          radius={draft.radius}
          onAreas={(areas) => setDraft({ ...draft, areas })}
          onRadius={(radius) => setDraft({ ...draft, radius })}
        />
        <ConnectionsSection />
        <OfficeLineSection phone={committed.profile.phone} />
        <TrackingNumbersSection />
      </div>
    </>
  );
}

/* ——————————————————————————————————————— */
/*  Firm — editable + Pi-managed mixed       */
/* ——————————————————————————————————————— */

function FirmSection({
  profile,
  editing,
  onChange,
  onEdit,
  onSave,
  onCancel,
}: {
  profile: FirmProfile;
  editing: boolean;
  onChange: (next: FirmProfile) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  function set<K extends keyof FirmProfile>(key: K, value: FirmProfile[K]) {
    onChange({ ...profile, [key]: value });
  }

  const lock = !editing;

  return (
    <Section
      title="Firm"
      sub="Used across ads copy, GBP, articles, and intake."
      right={
        editing ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-line bg-paper px-3 py-1 text-[12.5px] text-ink-2 transition-colors duration-150 hover:border-line-strong hover:text-ink-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-md bg-ink-1 px-3 py-1 text-[12.5px] font-medium text-paper transition-colors duration-150 hover:bg-accent-hover"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md border border-line bg-paper px-3 py-1 text-[12.5px] text-ink-2 transition-colors duration-150 hover:border-line-strong hover:text-ink-1"
          >
            Edit
          </button>
        )
      }
    >
      <Card>
        <FieldGrid>
          <Field
            label="Legal firm name"
            value={profile.name}
            hint="On state bar records. Set during onboarding."
            piManaged
            locked={lock}
          />
          <Field
            label="Display name"
            value={profile.displayName}
            hint="Shown in ads, GBP, and on-site copy."
            onChange={(v) => set("displayName", v)}
            locked={lock}
          />
          <Field
            label="Managing attorney"
            value={profile.partner}
            onChange={(v) => set("partner", v)}
            locked={lock}
          />
          <Field
            label="Office phone"
            value={profile.phone}
            hint="Master intake line — every tracking number forwards here."
            onChange={(v) => set("phone", v)}
            locked={lock}
          />
          <Field
            label="Intake email"
            value={profile.email}
            type="email"
            onChange={(v) => set("email", v)}
            locked={lock}
          />
          <Field
            label="Website"
            value={profile.website}
            hint="Primary domain. Changing this triggers a re-index."
            onChange={(v) => set("website", v)}
            locked={lock}
          />
          <Field
            label="Office address"
            value={profile.address}
            hint="Drives Maps verification. Changing it triggers re-verify."
            onChange={(v) => set("address", v)}
            wide
            locked={lock}
          />
          <Field
            label="Hours"
            value={profile.hours}
            onChange={(v) => set("hours", v)}
            wide
            locked={lock}
          />
          <Field
            label="Languages"
            value={profile.languages.join(", ")}
            hint="Drives ad copy, GBP attributes, and intake routing."
            onChange={(v) =>
              set(
                "languages",
                v.split(",").map((s) => s.trim()).filter(Boolean),
              )
            }
            locked={lock}
          />
          <Field
            label="Landing URL"
            value={profile.landingUrl}
            hint="Where paid traffic lands."
            onChange={(v) => set("landingUrl", v)}
            locked={lock}
          />
          <Field
            label="Bar admission state"
            value={profile.barState}
            hint="Set during onboarding. Drives jurisdiction tags."
            piManaged
            locked={lock}
          />
          <Field
            label="Bar number"
            value={profile.barNumber}
            piManaged
            locked={lock}
          />
          <TextareaField
            label="Style"
            value={profile.style}
            hint="How Pi writes for you — tone, do's and don'ts."
            onChange={(v) => set("style", v)}
            locked={lock}
          />
          <TextareaField
            label="Objective"
            value={profile.objective}
            hint="The result Pi optimizes toward."
            onChange={(v) => set("objective", v)}
            locked={lock}
          />
        </FieldGrid>
      </Card>
    </Section>
  );
}

/* ——————————————————————————————————————— */
/*  Focus — practice areas + service area    */
/* ——————————————————————————————————————— */

function FocusSection({
  areas,
  radius,
  onAreas,
  onRadius,
}: {
  areas: Record<string, boolean>;
  radius: number;
  onAreas: (next: Record<string, boolean>) => void;
  onRadius: (n: number) => void;
}) {
  const onCount = Object.values(areas).filter(Boolean).length;
  return (
    <Section
      title="Practice areas & service area"
      sub="Removed areas keep their existing rank but stop getting new spend or content."
    >
      <Card>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between">
              <FieldLabel>Practice areas</FieldLabel>
              <span className="text-[11px] text-ink-4 tabular">
                {onCount} active
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {firm.practiceAreas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="chip"
                  aria-pressed={areas[p.id]}
                  onClick={() =>
                    onAreas({ ...areas, [p.id]: !areas[p.id] })
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <FieldLabel>Service area</FieldLabel>
              <span className="text-[11px] text-ink-4 tabular">
                {firm.geo.zips.length} ZIPs
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="kpi-num" style={{ fontSize: "30px" }}>
                {radius}
              </div>
              <div className="text-[12.5px] text-ink-3">
                mile radius · {firm.geo.city}
              </div>
            </div>
            <div className="mt-4 max-w-[420px]">
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={radius}
                onChange={(e) => onRadius(Number(e.target.value))}
                aria-label="Service area radius"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {firm.geo.zips.map((z) => (
                <span
                  key={z}
                  className="rounded-full border border-line px-2 py-[3px] text-[11px] tabular text-ink-3"
                >
                  {z}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

/* ——————————————————————————————————————— */
/*  Connections — Pi-managed integrations     */
/* ——————————————————————————————————————— */

function ConnectionsSection() {
  return (
    <Section
      title="Connections"
      sub="Set up during onboarding. Every account stays in your firm's name."
    >
      <Card padding="none">
        <div className="grid grid-cols-[minmax(0,1.4fr)_140px_minmax(0,1fr)] gap-4 border-b border-line bg-paper-2 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.04em] text-ink-4">
          <div>Service</div>
          <div>Status</div>
          <div>Identifier</div>
        </div>
        {connections.map((c, i) => (
          <ConnectionRow key={c.id} c={c} first={i === 0} />
        ))}
      </Card>
      <p className="mt-3 px-1 text-[12px] leading-[1.6] text-ink-4">
        Anything marked <span className="text-ink-3">Pi-managed</span> is set
        up during your strategy call. You keep admin access from day one — Pi
        only logs in to operate. Anything that needs your input shows{" "}
        <span className="text-ink-3">Action needed</span>.
      </p>
    </Section>
  );
}

function ConnectionRow({ c, first }: { c: Connection; first: boolean }) {
  const actionable =
    c.status === "issue" || c.status === "not_connected";
  return (
    <div
      className={[
        "grid grid-cols-[minmax(0,1.4fr)_140px_minmax(0,1fr)] items-start gap-4 px-6 py-4 transition-colors duration-150 hover:bg-paper-2/40",
        first ? "" : "border-t border-line",
      ].join(" ")}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[14px] text-ink-1">
          <span>{c.name}</span>
          <ManagedTag managed={c.pi_managed} />
        </div>
        <div className="mt-1 text-[12px] leading-[1.55] text-ink-3">
          {c.description}
        </div>
        {c.detailNote && (
          <div className="mt-1 text-[11.5px] leading-[1.55] text-ink-4">
            {c.detailNote}
          </div>
        )}
      </div>
      <div>
        <StatusPill status={c.status} />
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[12.5px] tabular text-ink-2">
              {c.identifier ?? "—"}
            </div>
            {c.holder && (
              <div className="mt-0.5 text-[11.5px] text-ink-4">
                in {c.holder}'s name
              </div>
            )}
          </div>
          {actionable && (
            <button
              type="button"
              className="shrink-0 rounded-md border border-line bg-paper px-2.5 py-1 text-[12px] text-ink-1 transition-colors duration-150 hover:border-line-strong"
            >
              {c.status === "not_connected" ? "Connect" : "Resolve"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ManagedTag({ managed }: { managed: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-1.5 py-px text-[10px] font-medium uppercase tracking-[0.14em]",
        managed
          ? "bg-paper-2 text-ink-4"
          : "bg-warning-soft text-warning",
      ].join(" ")}
    >
      {managed ? "Pi-managed" : "User-supplied"}
    </span>
  );
}

function StatusPill({ status }: { status: ConnectionStatus }) {
  const map: Record<
    ConnectionStatus,
    { label: string; className: string; dot: string }
  > = {
    connected: {
      label: "Connected",
      className: "bg-success-soft text-success",
      dot: "bg-success",
    },
    pending: {
      label: "Pending verification",
      className: "bg-warning-soft text-warning",
      dot: "bg-warning",
    },
    issue: {
      label: "Action needed",
      className: "bg-danger-soft text-danger",
      dot: "bg-danger",
    },
    not_connected: {
      label: "Not connected",
      className: "bg-paper-2 text-ink-3",
      dot: "bg-ink-4",
    },
  };
  const cfg = map[status];
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[11px] font-medium",
        cfg.className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className={["inline-block h-1.5 w-1.5 rounded-full", cfg.dot].join(" ")}
      />
      {cfg.label}
    </span>
  );
}

/* ——————————————————————————————————————— */
/*  Office line — master forward            */
/* ——————————————————————————————————————— */

function OfficeLineSection({ phone }: { phone: string }) {
  return (
    <Section
      title="Office line"
      sub="Where every tracking number lands. Edit office phone above and every channel updates."
    >
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper-2 text-ink-3">
              <PhoneIcon />
            </div>
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-ink-4">
                All channels forward to
              </div>
              <div className="mt-1 text-[16px] tabular text-ink-1">{phone}</div>
            </div>
          </div>
          <p className="max-w-[360px] text-[12px] leading-[1.55] text-ink-4">
            Edit your office phone in the Firm section above — every existing
            forward updates instantly.
          </p>
        </div>
      </Card>
    </Section>
  );
}

/* ——————————————————————————————————————— */
/*  Tracking numbers — auto + manual         */
/* ——————————————————————————————————————— */

function TrackingNumbersSection() {
  const [statuses, setStatuses] = useState<Record<string, TrackingTestStatus>>(
    Object.fromEntries(trackingNumbers.map((t) => [t.channelKey, t.test])),
  );
  const [running, setRunning] = useState(false);

  function testOne(key: string) {
    setStatuses((s) => ({ ...s, [key]: "working" }));
  }

  function testAll() {
    setRunning(true);
    setTimeout(() => {
      setStatuses(
        Object.fromEntries(
          trackingNumbers.map((t) => [t.channelKey, "working" as const]),
        ),
      );
      setRunning(false);
    }, 900);
  }

  const untested = Object.values(statuses).filter((s) => s !== "working").length;

  return (
    <Section
      title="Tracking numbers"
      sub="One per channel, all forwarding to your office line. Lets Pi attribute every call to the channel that earned it."
    >
      <Card padding="none">
        <div className="grid grid-cols-[minmax(0,1.4fr)_140px_100px_minmax(0,1fr)_84px] gap-4 border-b border-line bg-paper-2 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.04em] text-ink-4">
          <div>Channel</div>
          <div>Number</div>
          <div>Placement</div>
          <div>Status</div>
          <div className="text-right">Test</div>
        </div>
        {trackingNumbers.map((t, i) => (
          <TrackingRow
            key={t.channelKey}
            t={t}
            test={statuses[t.channelKey]}
            first={i === 0}
            onTest={() => testOne(t.channelKey)}
          />
        ))}
      </Card>

      <div className="mt-4 rounded-[12px] border border-line bg-paper-2/40 px-5 py-4 text-[12px] leading-[1.6] text-ink-3">
        <span className="font-medium text-ink-2">Auto vs Manual.</span>{" "}
        <span className="text-ink-3">Auto</span> numbers drop into channels Pi
        already runs (Google Ads, Google Business) the moment we launch — no work
        for you. <span className="text-ink-3">Manual</span> numbers go on
        surfaces Pi can't reach (your site footer, Yelp, printed materials) and
        take a one-time copy-paste — we walk you through each one in onboarding.
      </div>

      <div className="mt-6 rounded-[14px] border border-line bg-paper p-6 shadow-[var(--shadow-sm)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-medium text-ink-1">
            Make sure it's working
          </h3>
          <div className="text-[11.5px] tabular text-ink-4">
            {untested === 0
              ? "All numbers verified"
              : `${untested} untested`}
          </div>
        </div>
        <p className="mt-2 max-w-[640px] text-[13px] leading-[1.6] text-ink-3">
          Pi places a recorded "this is a test" call to every number and watches
          it land on your office line. The status above flips to{" "}
          <span className="text-success">Working</span> the second we confirm.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={testAll}
            disabled={running}
            className={[
              "inline-flex items-center gap-2 rounded-md border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-150",
              running
                ? "cursor-default border-line bg-paper-2 text-ink-3"
                : "border-success bg-success-soft text-success hover:bg-success/10",
            ].join(" ")}
          >
            {running ? (
              <>
                <Spinner /> Testing…
              </>
            ) : (
              <>Run automatic test on all {trackingNumbers.length} numbers</>
            )}
          </button>
          <span className="text-[12px] text-ink-4">
            or dial any number above from your cell to test it manually
          </span>
        </div>
      </div>
    </Section>
  );
}

function TrackingRow({
  t,
  test,
  first,
  onTest,
}: {
  t: TrackingNumber;
  test: TrackingTestStatus;
  first: boolean;
  onTest: () => void;
}) {
  return (
    <div
      className={[
        "grid grid-cols-[minmax(0,1.4fr)_140px_100px_minmax(0,1fr)_84px] items-center gap-4 px-6 py-3.5 transition-colors duration-150 hover:bg-paper-2/40",
        first ? "" : "border-t border-line",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <ChannelDot k={t.channelKey} />
        <span className="truncate text-[13.5px] text-ink-1">{t.channel}</span>
      </div>
      <div className="text-[12.5px] tabular text-ink-2">{t.number}</div>
      <div>
        <PlacementPill placement={t.placement} />
      </div>
      <div>
        <TestPill status={test} />
      </div>
      <div className="text-right">
        <button
          type="button"
          onClick={onTest}
          className="rounded-md border border-line bg-paper px-2.5 py-1 text-[12px] text-ink-2 transition-colors duration-150 hover:border-line-strong hover:text-ink-1"
        >
          Test
        </button>
      </div>
    </div>
  );
}

function PlacementPill({ placement }: { placement: "auto" | "manual" }) {
  return placement === "auto" ? (
    <span className="inline-flex items-center rounded-full bg-success-soft px-2 py-[2px] text-[11px] font-medium text-success">
      Auto
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-warning-soft px-2 py-[2px] text-[11px] font-medium text-warning">
      Manual
    </span>
  );
}

function TestPill({ status }: { status: TrackingTestStatus }) {
  if (status === "working") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] text-success">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
        Working
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] text-danger">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-danger" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-4">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-4" />
      Not tested
    </span>
  );
}

function ChannelDot({ k }: { k: string }) {
  const color =
    k === "gads"
      ? "bg-info"
      : k === "lsa"
        ? "bg-accent"
        : k === "gbp"
          ? "bg-warning"
          : k === "site"
            ? "bg-success"
            : "bg-ink-3";
  return (
    <span
      className={[
        "inline-block h-2 w-2 rounded-[2px]",
        color,
      ].join(" ")}
    />
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.2 2.5h2.4l1.2 3-1.5 1c.7 1.6 2 2.9 3.6 3.6l1-1.5 3 1.2v2.4c0 .4-.3.8-.7.8C7 13 3 9 2.5 3.3c-.05-.4.3-.8.7-.8z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="animate-spin"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ——————————————————————————————————————— */
/*  Primitives                                */
/* ——————————————————————————————————————— */

function Section({
  title,
  sub,
  right,
  children,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-[640px]">
          <h2
            className="font-display text-ink-1"
            style={{
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: "1.2",
            }}
          >
            {title}
          </h2>
          {sub && (
            <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ink-3">
              {sub}
            </p>
          )}
        </div>
        {right && <div className="shrink-0 pt-1">{right}</div>}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Card({
  children,
  padding = "default",
}: {
  children: React.ReactNode;
  padding?: "default" | "none";
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[14px] border border-line bg-paper shadow-[var(--shadow-sm)]",
        padding === "default" ? "p-6" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">{children}</div>
  );
}

function Field({
  label,
  value,
  hint,
  type = "text",
  piManaged,
  locked,
  wide,
  onChange,
}: {
  label: string;
  value: string;
  hint?: string;
  type?: string;
  piManaged?: boolean;
  locked?: boolean;
  wide?: boolean;
  onChange?: (v: string) => void;
}) {
  const readOnly = piManaged || locked;
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <div className="flex items-center justify-between">
        <FieldLabel>{label}</FieldLabel>
        {piManaged && <PiManagedTag />}
      </div>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          "mt-1.5 w-full rounded-md border bg-paper px-3 py-1.5 text-[13.5px] text-ink-1 transition-colors duration-150 tabular",
          readOnly
            ? "cursor-default border-line bg-paper-2/40 text-ink-3"
            : "border-line hover:border-line-strong focus:border-line-strong focus:outline-none",
        ].join(" ")}
      />
      {hint && (
        <div className="mt-1 text-[11.5px] leading-[1.55] text-ink-4">
          {hint}
        </div>
      )}
    </div>
  );
}

function TextareaField({
  label,
  value,
  hint,
  locked,
  onChange,
}: {
  label: string;
  value: string;
  hint?: string;
  locked?: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="md:col-span-2">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={3}
        readOnly={locked}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          "mt-1.5 w-full resize-none rounded-md border bg-paper px-3 py-2 text-[13.5px] leading-[1.55] transition-colors duration-150",
          locked
            ? "cursor-default border-line bg-paper-2/40 text-ink-3"
            : "border-line text-ink-1 hover:border-line-strong focus:border-line-strong focus:outline-none",
        ].join(" ")}
      />
      {hint && (
        <div className="mt-1 text-[11.5px] leading-[1.55] text-ink-4">
          {hint}
        </div>
      )}
    </div>
  );
}

function PiManagedTag() {
  return (
    <span className="inline-flex items-center rounded-full bg-paper-2 px-1.5 py-px text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-4">
      Pi-managed
    </span>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-4">
      {children}
    </div>
  );
}
