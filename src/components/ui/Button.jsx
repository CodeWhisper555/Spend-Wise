import { Loader2 } from "lucide-react";

const variantClasses = {
  primary:
    "bg-[#d9a928] text-[#090909] hover:bg-[#e8bd4c] focus-visible:ring-[#d9a928]/50",

  secondary:
    "border border-black/10 bg-black/[0.04] text-[#171717] hover:bg-black/[0.08] focus-visible:ring-black/20 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.1] dark:focus-visible:ring-white/30",

  outline:
    "border border-[#b88912]/45 bg-transparent text-[#9a7410] hover:bg-[#d9a928]/10 focus-visible:ring-[#d9a928]/50 dark:border-[#d9a928]/40 dark:text-[#e8c45d]",

  ghost:
    "bg-transparent text-black/60 hover:bg-black/[0.05] hover:text-[#171717] focus-visible:ring-black/20 dark:text-white/60 dark:hover:bg-white/[0.06] dark:hover:text-white dark:focus-visible:ring-white/30",

  danger:
    "bg-red-500/10 text-red-600 hover:bg-red-500/20 focus-visible:ring-red-500/40 dark:text-red-400",
};

const sizeClasses = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition duration-200 focus:outline-none focus-visible:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <Loader2
          size={16}
          className="animate-spin"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}

export default Button;