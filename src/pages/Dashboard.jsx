import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import SpendingBreakdown from "../components/dashboard/SpendingBreakdown";
import MonthlySpendingChart from "../components/dashboard/MonthlySpendingChart";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import BudgetProgress from "../components/dashboard/BudgetProgress";

const EXPENSES_STORAGE_KEY = "spendwise-expenses";

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

const loadBudget = () => {
  try {
    const savedBudget = localStorage.getItem("spendwise-budget");
    return savedBudget ? Number(savedBudget) : 50000;
  } catch (error) {
    console.error("Failed to load budget:", error);
    return 50000;
  }
};

const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};

function Dashboard() {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [monthlyBudget, setMonthlyBudget] = useState(loadBudget);

  const refreshData = () => {
    setExpenses(loadExpenses());
    setMonthlyBudget(loadBudget());
  };

  useEffect(() => {
    refreshData();

    window.addEventListener("focus", refreshData);
    window.addEventListener("storage", refreshData);
    window.addEventListener("spendwise-expenses-updated", refreshData);
    window.addEventListener("spendwise-budget-updated", refreshData);

    return () => {
      window.removeEventListener("focus", refreshData);
      window.removeEventListener("storage", refreshData);
      window.removeEventListener("spendwise-expenses-updated", refreshData);
      window.removeEventListener("spendwise-budget-updated", refreshData);
    };
  }, []);

  const getDynamicGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

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
    monthlyBudget - totalSpent,
    0
  );

  const budgetUsedPercentage =
    monthlyBudget > 0
      ? (totalSpent / monthlyBudget) * 100
      : 0;

  const cappedBudgetUsedPercentage = Math.min(budgetUsedPercentage, 100);
  const isFullOrOverBudget = budgetUsedPercentage >= 100;

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
          <p className="text-sm text-slate-500 dark:text-white/40">
            {formattedDate}
          </p>

          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {getDynamicGreeting()}
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-white/45">
            Here&apos;s an overview of your spending activity.
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
            monthlyBudget
          )}`}
          trend={isFullOrOverBudget ? null : `${Math.round(100 - cappedBudgetUsedPercentage)}%`}
          trendLabel={isFullOrOverBudget ? "budget limit reached" : "budget remaining"}
          trendDirection={budgetUsedPercentage === 0 ? "up" : "down"}
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
          budget={monthlyBudget}
        />
      </div>

      <Card className="border-[#d9a928]/25 bg-[#d9a928]/[0.04]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white/85">
              Keep your spending intentional
            </p>

            <p className="mt-1 text-xs text-slate-600 dark:text-white/40">
              Review your expenses regularly to stay on track with your
              goals.
            </p>
          </div>

          <Link
            to="/expenses"
            className="inline-flex items-center justify-center rounded-xl border border-[#b88912]/35 px-4 py-2.5 text-xs font-semibold text-[#9a7410] transition hover:bg-[#d9a928]/10 dark:border-[#d9a928]/25 dark:text-[#e8c45d]"
          >
            Review expenses
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
