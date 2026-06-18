type PlatformSealProps = {
  icon: string;
  className?: string;
  iconClassName?: string;
  filled?: boolean;
};

export function PlatformSeal({
  icon,
  className = "",
  iconClassName = "",
  filled = false,
}: PlatformSealProps) {
  return (
    <div
      className={`rounded-full border border-border-low flex items-center justify-center bg-transparent shrink-0 ${className}`}
    >
      <span
        className={`material-symbols-outlined text-text-primary ${filled ? "filled" : ""} ${iconClassName}`}
      >
        {icon}
      </span>
    </div>
  );
}
