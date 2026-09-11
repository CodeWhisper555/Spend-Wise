import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Card from "../ui/Card";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
  trendDirection = "up",
}) {
  const isPositive = trendDirection === "up";

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-black/50 dark:text-white/45">
            {title}
          </p>

          <p className="mt-3 truncate font-display text-2xl font-bold tracking-tight text-[#171717] dark:text-white sm:text-3xl">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-black/45 dark:text-white/35">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d9a928]/25 bg-[#d9a928]/10 text-[#b88912] dark:border-[#d9a928]/20 dark:text-[#d9a928]">
            <Icon size={21} strokeWidth={1.8} />
          </div>
        )}
      </div>

      {(trend || trendLabel) && (
        <div className="mt-5 flex items-center gap-2">
          {trend && (
            <span
              className={[
                "inline-flex items-center gap-1 text-xs font-semibold",
                isPositive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400",
              ].join(" ")}
            >
              {isPositive ? (
                <ArrowUpRight size={14} strokeWidth={2} />
              ) : (
                <ArrowDownRight size={14} strokeWidth={2} />
              )}
              {trend}
            </span>
          )}

          {trendLabel && (
            <span className="text-xs text-black/45 dark:text-white/35">
              {trendLabel}
            </span>
          )}
        </div>
      )}

      <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#d9a928]/5 blur-2xl" />
    </Card>
  );
}

export default StatCard;