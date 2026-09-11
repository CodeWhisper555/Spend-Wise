import { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Card from "../ui/Card";

const chartColors = [
  "#D9A928",
  "#8E6B1F",
  "#F2D27A",
  "#6B7280",
  "#3F3F46",
];

function SpendingBreakdown({ expenses = [] }) {
  const { data, totalAmount } = useMemo(() => {
    const categoryTotals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";
      const amount = Number(expense.amount) || 0;

      categoryTotals[category] =
        (categoryTotals[category] || 0) + amount;
    });

    const total = Object.values(categoryTotals).reduce(
      (sum, amount) => sum + amount,
      0
    );

    const chartData = Object.entries(categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount,
        value:
          total > 0
            ? Number(((amount / total) * 100).toFixed(1))
            : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      data: chartData,
      totalAmount: total,
    };
  }, [expenses]);

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-base font-semibold text-[#171717] dark:text-white">
            Spending breakdown
          </h2>

          <p className="mt-1 text-xs text-black/45 dark:text-white/40">
            Where your money goes
          </p>
        </div>

        <span className="shrink-0 rounded-lg bg-black/[0.04] px-2.5 py-1 text-xs text-black/50 dark:bg-white/[0.04] dark:text-white/45">
          This month
        </span>
      </div>

      <div className="relative mt-4 h-64">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-black/45 dark:text-white/40">
            No expenses available
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={96}
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--chart-tooltip-bg)",
                    border: "1px solid var(--chart-tooltip-border)",
                    borderRadius: "12px",
                    color: "var(--chart-tooltip-text)",
                    fontSize: "12px",
                  }}
                  labelStyle={{
                    color: "var(--chart-tooltip-text)",
                  }}
                  itemStyle={{
                    color: "var(--chart-tooltip-text)",
                  }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-black/45 dark:text-white/40">
                Total spent
              </span>

              <span className="mt-1 font-display text-xl font-bold text-[#171717] dark:text-white">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </>
        )}
      </div>

      {data.length > 0 && (
        <div className="grid grid-cols-1 gap-y-3 border-t border-black/10 pt-4 dark:border-white/10 sm:grid-cols-2 sm:gap-x-4">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex min-w-0 items-center gap-2"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    chartColors[index % chartColors.length],
                }}
              />

              <span className="min-w-0 truncate text-xs text-black/55 dark:text-white/50">
                {item.name}
              </span>

              <span className="ml-auto shrink-0 text-xs font-semibold text-black/75 dark:text-white/75">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default SpendingBreakdown;