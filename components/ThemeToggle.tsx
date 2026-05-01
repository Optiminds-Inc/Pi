"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pi-theme";

type Theme = "light" | "dark";

function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, toggle, mounted };
}

export function ThemeToggleIcon({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "inline-flex h-[32px] w-[32px] items-center justify-center rounded-md text-ink-3 transition-colors duration-150 hover:bg-paper-2 hover:text-ink-1",
        className,
      ].join(" ")}
    >
      <SunIcon className={mounted && isDark ? "block" : "hidden"} />
      <MoonIcon className={!mounted || !isDark ? "block" : "hidden"} />
    </button>
  );
}

export function ThemeToggleRow() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] text-ink-2 transition-colors duration-150 hover:bg-paper-2 hover:text-ink-1"
    >
      <span className="inline-flex items-center gap-2">
        <span className="text-ink-3">
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
        Dark mode
      </span>
      <span
        className={[
          "relative inline-block h-[16px] w-[28px] rounded-full transition-colors duration-200",
          isDark ? "bg-info" : "bg-paper-3",
        ].join(" ")}
        aria-hidden
      >
        <span
          className={[
            "absolute top-[2px] block h-[12px] w-[12px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform duration-200",
            isDark ? "translate-x-[14px]" : "translate-x-[2px]",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 1.5v1.6M8 12.9v1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M1.5 8h1.6M12.9 8h1.6M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M13.4 9.7A5.5 5.5 0 0 1 6.3 2.6a5.5 5.5 0 1 0 7.1 7.1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
