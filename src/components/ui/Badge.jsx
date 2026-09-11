const variantClasses = {
  default:
    "border-white/10 bg-white/[0.06] text-white/65",
  gold:
    "border-[#d9a928]/25 bg-[#d9a928]/10 text-[#e8bd4c]",
  success:
    "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  danger:
    "border-red-400/20 bg-red-400/10 text-red-400",
  warning:
    "border-amber-400/20 bg-amber-400/10 text-amber-300",
  info:
    "border-sky-400/20 bg-sky-400/10 text-sky-400",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border font-semibold",
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.sm,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default Badge;