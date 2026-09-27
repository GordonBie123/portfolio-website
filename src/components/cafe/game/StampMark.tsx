// Red hanko-style "tried" stamp. SVG so it stays round despite the global radius reset.
export function StampMark({ className, label }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#C94D4D" />
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="#F8F4EC" strokeWidth="1.5" opacity="0.8" />
      {label ? (
        <text x="20" y="25.5" textAnchor="middle" fontSize="15" fill="#F8F4EC" fontFamily="serif">{label}</text>
      ) : (
        <path d="M12.5,20.5 L18,26 L28,14.5" fill="none" stroke="#F8F4EC" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
