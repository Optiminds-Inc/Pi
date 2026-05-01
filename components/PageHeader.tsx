import { ReactNode } from "react";

export default function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="px-10 pt-14 pb-1">
      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 max-w-[760px]">
          <h1
            className="font-display text-ink-1"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: "1.15",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <div className="mt-2.5 text-[14px] leading-[1.55] text-ink-3">
              {subtitle}
            </div>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2 pt-3">{actions}</div>
        )}
      </div>
    </header>
  );
}

export function HeaderButton({
  children,
  onClick,
  primary,
}: {
  children: ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        primary
          ? "inline-flex h-[32px] items-center gap-1.5 rounded-md bg-ink-1 px-4 text-[12.5px] font-medium text-paper transition-colors duration-200 hover:bg-accent-hover"
          : "btn-compact"
      }
    >
      {children}
    </button>
  );
}
