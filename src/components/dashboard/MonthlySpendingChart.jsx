import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../ui/Card";

const defaultData = [
  { month: "Jan", amount: 4200 },
  { month: "Feb", amount: 5800 },
  { month: "Mar", amount: 4900 },
  { month: "Apr", amount: 7200 },
  { month: "May", amount: 6100 },
  { month: "Jun", amount: 8400 },
];

function MonthlySpendingChart({
  data = defaultData,
  title = "Monthly spending",
  description = "Your spending trend over time",
}) {
  const monthCount = data?.length ?? 0;

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-base font-semibold text-[#171717] dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-xs text-black/45 dark:text-white/40">
            {description}
          </p>
        </div>

        <span className="shrink-0 rounded-lg bg-black/[0.04] px-2.5 py-1 text-xs text-black/50 dark:bg-white/[0.04] dark:text-white/45">
          {monthCount} {monthCount === 1 ? "month" : "months"}
        </span>
      </div>

      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="rgba(128,128,128,0.18)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(128,128,128,0.75)",
                fontSize: 11,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(128,128,128,0.75)",
                fontSize: 11,
              }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              cursor={{
                stroke: "rgba(217,169,40,0.25)",
                strokeWidth: 1,
              }}
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: "12px",
                color: "var(--chart-tooltip-text)",
                fontSize: "12px",
              }}
              labelStyle={{
                color: "var(--chart-tooltip-text)",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "var(--chart-tooltip-text)",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Spent",
              ]}
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#D9A928"
              strokeWidth={3}
              dot={{
                r: 3,
                fill: "#D9A928",
                stroke: "#111111",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#F2D27A",
                stroke: "#D9A928",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlySpendingChart;