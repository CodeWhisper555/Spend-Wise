import { ChevronDown } from "lucide-react";

function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-black/70 dark:text-white/70">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          {...props}
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          className={[
            "h-11 w-full appearance-none rounded-xl border px-3 pr-10 text-sm outline-none transition",
            "border-black/[0.12] bg-black/[0.025] text-[#171717]",
            "focus:border-[#b88912] focus:ring-2 focus:ring-[#d9a928]/20",
            "dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white",
            "dark:focus:border-[#d9a928]",
          ].join(" ")}
        >
          {placeholder && (
            <option
              value=""
              disabled
              className="bg-white text-[#171717] dark:bg-zinc-900 dark:text-white"
            >
              {placeholder}
            </option>
          )}

          {options.map((option) => {
            const normalizedOption =
              typeof option === "string"
                ? {
                    label: option,
                    value: option,
                  }
                : option;

            return (
              <option
                key={normalizedOption.value}
                value={normalizedOption.value}
                className="bg-white text-[#171717] dark:bg-zinc-900 dark:text-white"
              >
                {normalizedOption.label}
              </option>
            );
          })}
        </select>

        <ChevronDown
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40"
        />
      </div>
    </div>
  );
}

export default Select;