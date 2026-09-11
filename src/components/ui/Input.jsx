function Input({
  label,
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-black/70 dark:text-white/70">
          {label}
        </label>
      )}

      <input
        {...props}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        className={[
          "h-11 w-full rounded-xl border px-3 text-sm outline-none",
          "border-black/[0.12] bg-black/[0.025] text-[#171717]",
          "placeholder:text-black/35",
          "focus:border-[#b88912] focus:ring-2 focus:ring-[#d9a928]/20",
          "dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white",
          "dark:placeholder:text-white/30",
          "dark:focus:border-[#d9a928]",
          className,
        ].join(" ")}
      />
    </div>
  );
}

export default Input;