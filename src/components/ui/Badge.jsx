const variantClasses = {
  default: "border-slate-200 bg-slate-100 text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/65",
  gold: "border-[#d9a928]/30 bg-[#d9a928]/10 text-[#a37810] dark:border-[#d9a928]/25 dark:text-[#e8bd4c]",
  success: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400",
  danger: "border-red-300 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400",
  warning: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300",
  info: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-400",
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
