"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { agents, firm, getPendingCount, running } from "@/lib/mock";
import { ThemeToggleRow } from "@/components/ThemeToggle";

const MIN_WIDTH = 200;
const MAX_WIDTH = 380;
const DEFAULT_WIDTH = 232;
const STORAGE_KEY = "pi-sidebar-width";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname?.startsWith(href) ?? false;
  const isAgentsList = pathname === "/agents";

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (saved >= MIN_WIDTH && saved <= MAX_WIDTH) setWidth(saved);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
  }, [width]);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;
    setDragging(true);

    function onMove(ev: MouseEvent) {
      const next = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, startWidth + (ev.clientX - startX)),
      );
      setWidth(next);
    }
    function onUp() {
      setDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      try {
        const finalWidth = Number(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--sidebar-width")
            .replace("px", "")
            .trim(),
        );
        if (finalWidth >= MIN_WIDTH && finalWidth <= MAX_WIDTH) {
          localStorage.setItem(STORAGE_KEY, String(finalWidth));
        }
      } catch {}
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <aside
      style={{ width }}
      className="fixed inset-y-0 left-0 z-30 flex flex-col border-r border-line bg-paper-2"
    >
      {/* Top — logo */}
      <div className="px-5 pt-6 pb-5">
        <Link
          href="/"
          className="font-logo text-[22px] leading-none text-ink-1 transition-opacity duration-150 hover:opacity-70"
        >
          Pi
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-0.5">
          <NavItem
            href="/home"
            label="Dashboard"
            active={isActive("/home")}
            icon={<HomeIcon active={isActive("/home")} />}
          />
          <NavItem
            href="/leads"
            label="Leads"
            active={isActive("/leads")}
            icon={<LeadsIcon active={isActive("/leads")} />}
            badge={<MetaBadge text="3 new" />}
          />
          <NavItem
            href="/activity"
            label="Activity"
            active={isActive("/activity")}
            icon={<ActivityIcon active={isActive("/activity")} />}
            badge={<RunningBadge count={running.length} />}
          />
        </ul>

        <div className="mt-7">
          <SidebarLabel>Your AI team</SidebarLabel>
          <ul className="mt-2 space-y-0.5">
            {agents.map((a) => {
              const href = `/agents/${a.id}`;
              const active = pathname === href;
              const pending = getPendingCount(a.id);
              return (
                <AgentNavItem
                  key={a.id}
                  href={href}
                  label={a.name}
                  tagline={a.tagline}
                  active={active}
                  pending={pending}
                />
              );
            })}
            <NewAgentItem active={isAgentsList} />
          </ul>
        </div>

        <div className="mt-7">
          <SidebarLabel>Operations</SidebarLabel>
          <ul className="mt-2 space-y-0.5">
            <NavItem
              href="/setup"
              label="Setup"
              active={isActive("/setup")}
              icon={<SetupIcon active={isActive("/setup")} />}
            />
          </ul>
        </div>
      </nav>

      <ProfileMenu />

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        onMouseDown={startDrag}
        onDoubleClick={() => {
          setWidth(DEFAULT_WIDTH);
          localStorage.setItem(STORAGE_KEY, String(DEFAULT_WIDTH));
        }}
        className={[
          "group absolute inset-y-0 -right-1 z-40 w-2 cursor-col-resize",
          "after:absolute after:inset-y-0 after:right-1 after:w-px after:transition-colors after:duration-150",
          dragging
            ? "after:bg-ink-3"
            : "after:bg-transparent hover:after:bg-line",
        ].join(" ")}
      />
    </aside>
  );
}

/* ——————————————————————————————————————— */
/*  Pieces                                   */
/* ——————————————————————————————————————— */

function NavItem({
  href,
  label,
  active,
  icon,
  badge,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={[
          "group flex items-center gap-2.5 rounded-[8px] px-3 py-[7px] text-[13.5px] transition-all duration-200",
          active
            ? "bg-paper text-ink-1 shadow-[var(--shadow-xs)]"
            : "text-ink-3 hover:bg-paper hover:text-ink-1",
        ].join(" ")}
      >
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
        <span className={["flex-1 truncate", active ? "font-medium" : ""].join(" ")}>
          {label}
        </span>
        {badge && <span className="shrink-0">{badge}</span>}
      </Link>
    </li>
  );
}

function AgentNavItem({
  href,
  label,
  tagline,
  active,
  pending,
}: {
  href: string;
  label: string;
  tagline: string;
  active: boolean;
  pending: number;
}) {
  return (
    <li>
      <Link
        href={href}
        className={[
          "group flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-[13.5px] transition-all duration-200",
          active
            ? "bg-paper text-ink-1 shadow-[var(--shadow-xs)]"
            : "text-ink-3 hover:bg-paper hover:text-ink-1",
        ].join(" ")}
      >
        <span className="shrink-0">
          <AgentDot active={active} />
        </span>
        <span className="min-w-0 flex-1">
          <span className={["block truncate", active ? "font-medium text-ink-1" : ""].join(" ")}>
            {label}
          </span>
          <span className="block truncate text-[11px] text-ink-4">
            {tagline}
          </span>
        </span>
        {pending > 0 && <PendingDot count={pending} />}
      </Link>
    </li>
  );
}

function NewAgentItem({ active }: { active: boolean }) {
  return (
    <li>
      <Link
        href="/agents"
        className={[
          "group flex items-center gap-2.5 rounded-[8px] px-3 py-[7px] text-[13.5px] transition-all duration-200",
          active
            ? "bg-paper text-ink-1 shadow-[var(--shadow-xs)]"
            : "text-ink-4 hover:bg-paper hover:text-ink-2",
        ].join(" ")}
      >
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
          <PlusIcon active={active} />
        </span>
        <span className={["flex-1", active ? "font-medium" : ""].join(" ")}>
          New agent
        </span>
      </Link>
    </li>
  );
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 text-[10.5px] uppercase tracking-[0.2em] text-ink-4">
      {children}
    </div>
  );
}

function RunningBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[11px] tabular text-ink-2">{count}</span>
      <span className="dot-live" style={{ width: "6px", height: "6px" }} />
    </span>
  );
}

function PendingDot({ count }: { count: number }) {
  return (
    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-warning px-1 text-[10.5px] font-medium tabular text-white">
      {count}
    </span>
  );
}

function MetaBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-warning-soft px-2 py-[1px] text-[10.5px] font-medium text-warning">
      {text}
    </span>
  );
}

/* ——————————————————————————————————————— */
/*  Profile pop-up                           */
/* ——————————————————————————————————————— */

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initials = firm.partner
    .split(" ")
    .map((s) => s[0])
    .join("");

  return (
    <div ref={ref} className="relative border-t border-line-glass p-2">
      {open && (
        <div className="animate-scale-in absolute right-2 bottom-full left-2 mb-2 origin-bottom overflow-hidden rounded-[8px] border border-line bg-paper shadow-[var(--shadow-lg)]">
          <div className="px-3 pt-3 pb-2.5">
            <div className="text-[12.5px] font-medium text-ink-1">
              {firm.partner}
            </div>
            <div className="mt-0.5 text-[11.5px] text-ink-4">{firm.fullName}</div>
          </div>
          <div className="border-t border-line py-1">
            <MenuLink href="/billing" label="Billing" />
            <MenuLink href="/help" label="Help" />
          </div>
          <div className="border-t border-line py-1">
            <ThemeToggleRow />
          </div>
          <div className="border-t border-line py-1">
            <button
              type="button"
              className="block w-full px-3 py-1.5 text-left text-[13px] text-ink-2 transition-colors duration-150 hover:bg-paper-2 hover:text-ink-1"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          "flex w-full items-center gap-3 rounded-[8px] px-2.5 py-2 text-left transition-all duration-200",
          open ? "bg-paper shadow-[var(--shadow-xs)]" : "hover:bg-paper",
        ].join(" ")}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper-2 text-[11.5px] font-medium text-ink-2">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-medium text-ink-1">
            {firm.partner}
          </div>
          <div className="truncate text-[11px] text-ink-4">{firm.city}</div>
        </div>
        <ChevronUpIcon />
      </button>
    </div>
  );
}

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-1.5 text-[13px] text-ink-2 transition-colors duration-150 hover:bg-paper-2 hover:text-ink-1"
    >
      {label}
    </Link>
  );
}

/* ——— Icons ——— */

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 7L8 2.5L13.5 7V13.2C13.5 13.4 13.4 13.5 13.2 13.5H10V10H6V13.5H2.8C2.6 13.5 2.5 13.4 2.5 13.2V7Z"
        stroke="currentColor"
        strokeWidth={active ? 1.5 : 1.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
function LeadsIcon({ active }: { active?: boolean }) {
  const w = active ? 1.5 : 1.2;
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="3" y="2.5" width="10" height="11" rx="1.4" stroke="currentColor" strokeWidth={w} />
      <line x1="5.5" y1="6" x2="10.5" y2="6" stroke="currentColor" strokeWidth={w} strokeLinecap="round" />
      <line x1="5.5" y1="9" x2="10.5" y2="9" stroke="currentColor" strokeWidth={w} strokeLinecap="round" />
      <line x1="5.5" y1="12" x2="8.5" y2="12" stroke="currentColor" strokeWidth={w} strokeLinecap="round" />
    </svg>
  );
}
function ActivityIcon({ active }: { active?: boolean }) {
  const w = active ? 1.5 : 1.2;
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M1.5 8h2.6l1.7-4.5 2.4 9 1.7-4.5h4.6"
        stroke="currentColor"
        strokeWidth={w}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SetupIcon({ active }: { active?: boolean }) {
  const w = active ? 1.5 : 1.2;
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth={w} />
      <path
        d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8L3.4 3.4"
        stroke="currentColor"
        strokeWidth={w}
        strokeLinecap="round"
      />
    </svg>
  );
}
function PlusIcon({ active }: { active?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 3.5v9M3.5 8h9"
        stroke="currentColor"
        strokeWidth={active ? 1.6 : 1.3}
        strokeLinecap="round"
      />
    </svg>
  );
}
function AgentDot({ active }: { active?: boolean }) {
  return (
    <span
      className={[
        "inline-block h-1.5 w-1.5 rounded-full",
        active ? "bg-ink-1" : "bg-ink-4",
      ].join(" ")}
      aria-hidden
    />
  );
}
function ChevronUpIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden className="text-ink-4">
      <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
