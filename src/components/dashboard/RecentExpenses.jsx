import { ArrowRight, ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

const defaultExpenses = [
  {
    id: 1,
    title: "Grocery shopping",
    category: "Food",
    date: "Today, 10:30 AM",
    amount: 850,
  },
  {
    id: 2,
    title: "Metro recharge",
    category: "Transport",
    date: "Yesterday, 6:15 PM",
    amount: 500,
  },
  {
    id: 3,
    title: "Online subscription",
    category: "Entertainment",
    date: "Sep 8, 2026",
    amount: 299,
  },
  {
    id: 4,
    title: "Coffee",
    category: "Food",
    date: "Sep 7, 2026",
    amount: 180,
  },
];

function RecentExpenses({ expenses = defaultExpenses }) {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-base font-semibold text-[#171717] dark:text-white">
            Recent expenses
          </h2>

          <p className="mt-1 text-xs text-black/45 dark:text-white/40">
            Your latest transactions
          </p>
        </div>

        <Link
          to="/expenses"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#b88912] transition hover:text-[#9a7410] dark:text-[#d9a928] dark:hover:text-[#f2d27a]"
        >
          View all
          <ArrowRight
            size={14}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="mt-5 divide-y divide-black/[0.08] dark:divide-white/[0.07]">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] text-black/50 dark:bg-white/[0.05] dark:text-white/50"
                >
                  <ReceiptText size={18} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-black/85 dark:text-white/85">
                    {expense.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-black/45 dark:text-white/35">
                    {expense.category || "Other"} · {expense.date}
                  </p>
                </div>
              </div>

              <p className="shrink-0 text-right text-sm font-semibold text-[#171717] dark:text-white">
                -₹{Number(expense.amount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-sm text-black/45 dark:text-white/40">
            No recent expenses found.
          </div>
        )}
      </div>
    </Card>
  );
}

export default RecentExpenses;