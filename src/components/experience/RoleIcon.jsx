// Simple line icons that give each role a visual identity (no photos).
const PATHS = {
  // Silicon wafer: disc with a flat notch and a die grid.
  wafer: (
    <>
      <path d="M18 4a14 14 0 1 0 9.9 4.1" />
      <path d="M27.9 8.1 24.6 5.2" />
      <path d="M10 14h16M10 18h16M10 22h16M14 10v16M18 10v16M22 10v16" opacity="0.55" />
    </>
  ),
  // Battery cell with a heat-switch "fuse" mark.
  battery: (
    <>
      <rect x="9" y="7" width="18" height="25" rx="3" />
      <path d="M15 3.5h6V7h-6z" />
      <path d="M19.5 12 15 20h6l-4.5 8" />
    </>
  ),
  // Furnace flame for pyrolysis.
  furnace: (
    <>
      <path d="M18 4c1 5.5 7 8 7 15a7 7 0 0 1-14 0c0-4 2.4-6.2 3.6-8.6.6 2.6 2 3.6 3.4 4.1C18.6 11 17.4 7.8 18 4Z" />
      <path d="M7 32h22" />
    </>
  ),
};

export default function RoleIcon({ name, size = 36 }) {
  return (
    <svg
      className="xp-icon"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name] || PATHS.wafer}
    </svg>
  );
}
