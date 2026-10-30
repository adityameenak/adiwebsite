// The site's "a." monogram, reused as adi.ai's identity.
export default function AdiMark({ size = 24, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="15" fill="var(--adi-mark-bg, #6d3bd1)" />
      <circle cx="27" cy="34" r="10.5" fill="none" stroke="#ffffff" strokeWidth="5.5" />
      <path d="M37.5 22v23" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="48" cy="45" r="3.6" fill="#d9caff" />
    </svg>
  );
}
