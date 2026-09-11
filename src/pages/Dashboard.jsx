import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import SpendingBreakdown from "../components/dashboard/SpendingBreakdown";
import MonthlySpendingChart from "../components/dashboard/MonthlySpendingChart";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import BudgetProgress from "../components/dashboard/BudgetProgress";

const EXPENSES_STORAGE_KEY = "spendwise-expenses";
const MONTHLY_BUDGET = 50000;

const loadExpenses = () => {
  try {
    const savedExpenses = localStorage.getItem(EXPENSES_STORAGE_KEY);

    if (!savedExpenses) {
      return [];
    }

    const parsedExpenses = JSON.parse(savedExpenses);

    return Array.isArray(parsedExpenses) ? parsedExpenses : [];
  } catch (error) {
    console.error("Failed to load dashboard expenses:", error);
    return [];
  }
};

const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};

function Dashboard() {
  const [expenses, setExpenses] = useState(loadExpenses);

  const refreshExpenses = () => {
    setExpenses(loadExpenses());
  };

  useEffect(() => {
    refreshExpenses();

    window.addEventListener("focus", refreshExpenses);
    window.addEventListener("storage", refreshExpenses);
    window.addEventListener(
      "spendwise-expenses-updated",
      refreshExpenses
    );

    return () => {
      window.removeEventListener("focus", refreshExpenses);
      window.removeEventListener("storage", refreshExpenses);
      window.removeEventListener(
        "spendwise-expenses-updated",
        refreshExpenses
      );
    };
  }, []);

  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses.filter((expense) => {
      if (!expense.date) {
        return false;
      }

      const expenseDate = new Date(`${expense.date}T00:00:00`);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  }, [expenses]);

  const totalSpent = useMemo(() => {
    return currentMonthExpenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );
  }, [currentMonthExpenses]);

  const averageDaily =
    new Date().getDate() > 0
      ? totalSpent / new Date().getDate()
      : 0;

  const remainingBudget = Math.max(
    MONTHLY_BUDGET - totalSpent,
    0
  );

  const budgetUsedPercentage =
    MONTHLY_BUDGET > 0
      ? Math.min((totalSpent / MONTHLY_BUDGET) * 100, 100)
      : 0;

  const monthlySpendingData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const monthLabels = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        currentYear,
        currentMonth - 5 + index,
        1
      );

      return {
        month: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
        amount: 0,
      };
    });

    expenses.forEach((expense) => {
      if (!expense.date) {
        return;
      }

      const expenseDate = new Date(`${expense.date}T00:00:00`);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();

      const matchingMonth = monthLabels.find(
        (month) =>
          month.monthIndex === expenseMonth &&
          month.year === expenseYear
      );

      if (matchingMonth) {
        matchingMonth.amount += Number(expense.amount || 0);
      }
    });

    return monthLabels.map(({ month, amount }) => ({
      month,
      amount,
    }));
  }, [expenses]);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-black/50 dark:text-white/40">
              {formattedDate}
            </p>

            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#171717] dark:text-white sm:text-3xl">
              Good morning
            </h1>

            <p className="mt-2 text-sm text-black/55 dark:text-white/45">
              Here's an overview of your spending activity.
            </p>
          </div>

          <Link to="/expenses">
            <Button>
              <Plus size={16} strokeWidth={2} />
              Add expense
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total spent"
            value={formatCurrency(totalSpent)}
            description="This month"
            trendLabel="current spending"
            trendDirection="up"
          />

          <StatCard
            title="Average daily"
            value={formatCurrency(averageDaily)}
            description="Based on days elapsed"
            trendLabel="daily average"
            trendDirection="down"
          />

          <StatCard
            title="Total expenses"
            value={String(currentMonthExpenses.length)}
            description="Transactions this month"
            trendLabel="current transactions"
            trendDirection="up"
          />

          <StatCard
            title="Remaining budget"
            value={formatCurrency(remainingBudget)}
            description={`Monthly limit ${formatCurrency(
              MONTHLY_BUDGET
            )}`}
            trend={`${Math.round(100 - budgetUsedPercentage)}%`}
            trendLabel="budget remaining"
            trendDirection="down"
          />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <MonthlySpendingChart data={monthlySpendingData} />

          <SpendingBreakdown expenses={currentMonthExpenses} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
          <RecentExpenses expenses={currentMonthExpenses} />

          <BudgetProgress
            spent={totalSpent}
            budget={MONTHLY_BUDGET}
          />
        </div>

        <Card className="border-[#d9a928]/25 bg-[#d9a928]/[0.04]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-black/85 dark:text-white/85">
                Keep your spending intentional
              </p>

              <p className="mt-1 text-xs text-black/50 dark:text-white/40">
                Review your expenses regularly to stay on track with your
                goals.
              </p>
            </div>

            <Link
              to="/expenses"
              className="inline-flex items-center justify-center rounded-xl border border-[#b88912]/35 px-4 py-2.5 text-xs font-semibold text-[#9a7410] transition hover:bg-[#d9a928]/10 dark:border-[#d9a928]/25 dark:text-[#e8c45d] dark:hover:bg-[#d9a928]/10"
            >
              Review expenses
            </Link>
          </div>
        </Card>
      </div>
  );
}

export default Dashboard;