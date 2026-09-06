export const APP_NAME = "mesNex";

export function AppLogo({ className = "", size = 32, alt = APP_NAME }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-linear-to-br from-[#131f3d] to-[#060a14] ring-1 ring-inset ring-[#d4af6a]/30 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="italic text-[#d4af6a]"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: size * 0.52,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        mN
      </span>
    </div>
  );
}