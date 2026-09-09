export default function Bullet() {
  return (
    <span
      aria-hidden="true"
      className="flex h-[1.625em] shrink-0 items-center text-acid-dim"
    >
      <svg viewBox="0 0 6 8" className="h-[0.55em] w-auto" fill="currentColor">
        <path d="M0 0 L6 4 L0 8 Z" />
      </svg>
    </span>
  );
}
