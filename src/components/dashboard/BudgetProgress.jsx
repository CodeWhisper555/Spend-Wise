import { AlertCircle, CheckCircle2, WalletCards } from "lucide-react";
import Card from "../ui/Card";

function BudgetProgress({ budget = 50000, spent = 32500 }) {
  const remaining = Math.max(budget - spent, 0);
  const rawPercentage = budget > 0 ? (spent / budget) * 100 : 0;
  const displayPercentage = Math.round(rawPercentage);
  const cappedPercentage = Math.min(rawPercentage, 100);
  const isOverBudget = spent > budget;
  const isFullBudget = displayPercentage >= 100;

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-IN");

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d9a928]/10 text-[#b88912] dark:text-[#d9a928]"
            >
              <WalletCards size={18} strokeWidth={1.8} />
            </div>

            <h2 className="font-display text-base font-semibold text-[#171717] dark:text-white">
              Monthly budget
            </h2>
          </div>

          <p className="mt-3 text-xs text-black/45 dark:text-white/40">
            Track your spending limit for this month
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            isOverBudget
              ? "bg-red-500/10 text-red-600 dark:text-red-400"
              : "bg-black/[0.05] text-black/55 dark:bg-white/[0.05] dark:text-white/50"
          }`}
        >
          {displayPercentage}% spent
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-2xl font-semibold tracking-tight text-[#171717] dark:text-white">
              ₹{formatAmount(spent)}
            </p>

            <p className="mt-1 text-xs text-black/45 dark:text-white/35">
              of ₹{formatAmount(budget)} limit
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p
              className={`text-sm font-semibold ${
                isOverBudget
                  ? "text-red-600 dark:text-red-400"
                  : "text-[#b88912] dark:text-[#d9a928]"
              }`}
            >
              ₹{formatAmount(isOverBudget ? spent - budget : remaining)}
            </p>

            <p className="mt-1 text-xs text-black/45 dark:text-white/35">
              {isOverBudget ? "exceeded limit" : "remaining"}
            </p>
          </div>
        </div>

        <div
          className="mt-5 h-2 overflow-hidden rounded-full bg-black/[0.08] dark:bg-white/[0.07]"
          role="progressbar"
          aria-label="Monthly budget usage"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={cappedPercentage}
        >
          <div
            className={`h-full rounded-full transition-all ${
              isOverBudget ? "bg-red-500" : "bg-[#d9a928]"
            }`}
            style={{ width: `${cappedPercentage}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
          <span className="min-w-0 text-black/45 dark:text-white/35">
            {isOverBudget
              ? "You have exceeded your monthly budget."
              : isFullBudget
              ? "You have reached your exact budget limit."
              : "You're within your monthly limit."}
          </span>

          {isOverBudget ? (
            <AlertCircle
              aria-hidden="true"
              size={15}
              className="shrink-0 text-red-600 dark:text-red-400"
              strokeWidth={1.8}
            />
          ) : isFullBudget ? (
            <CheckCircle2
              aria-hidden="true"
              size={15}
              className="shrink-0 text-[#b88912] dark:text-[#d9a928]"
              strokeWidth={1.8}
            />
          ) : (
            <CheckCircle2
              aria-hidden="true"
              size={15}
              className="shrink-0 text-emerald-600 dark:text-emerald-400"
              strokeWidth={1.8}
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default BudgetProgress;
