/*
 * Pi wordmark.
 *  P = a hammer/gavel — a horizontal head sitting on a vertical handle.
 *  i = a pen — a round cap, a slim body, and a triangular nib that drops
 *      below the baseline.
 * Uses currentColor so it inherits from the surrounding text color and
 * adapts to light/dark mode automatically.
 */
export function PiLogo({
  className = "",
  size = 22,
}: {
  className?: string;
  size?: number;
}) {
  const ASPECT = 56 / 36;
  const height = size;
  const width = size * ASPECT;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Pi"
    >
      {/* P — hammer */}
      <rect x="0" y="2" width="22" height="9" rx="2" />
      <rect x="4" y="11" width="6" height="22" rx="1.5" />

      {/* i — pen */}
      <circle cx="40" cy="5" r="3" />
      <rect x="37" y="12" width="6" height="14" rx="1.5" />
      <path d="M35 26 L40 33 L45 26 Z" />
    </svg>
  );
}
