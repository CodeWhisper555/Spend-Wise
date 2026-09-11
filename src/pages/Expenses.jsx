import { Plus, ReceiptText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";
import BackButton from "../components/ui/BackButton";

const initialExpenses = [
  {
    id: 1,
    title: "Grocery shopping",
    amount: 850,
    category: "Food",
    paymentMethod: "UPI",
    date: "2026-09-10",
    description: "Weekly groceries",
  },
  {
    id: 2,
    title: "Metro recharge",
    amount: 500,
    category: "Transport",
    paymentMethod: "UPI",
    date: "2026-09-09",
    description: "Monthly metro balance",
  },
  {
    id: 3,
    title: "Online subscription",
    amount: 299,
    category: "Entertainment",
    paymentMethod: "Card",
    date: "2026-09-08",
    description: "Streaming subscription",
  },
  {
    id: 4,
    title: "Coffee",
    amount: 180,
    category: "Food",
    paymentMethod: "Cash",
    date: "2026-09-07",
    description: "Coffee with friends",
  },
];

const EXPENSES_STORAGE_KEY = "spendwise-expenses";

const loadExpenses = () => {
  try {
    const savedExpenses = localStorage.getItem(
      EXPENSES_STORAGE_KEY
    );

    if (!savedExpenses) {
      return initialExpenses;
    }

    const parsedExpenses = JSON.parse(savedExpenses);

    return Array.isArray(parsedExpenses)
      ? parsedExpenses
      : initialExpenses;
  } catch (error) {
    console.error("Failed to load expenses:", error);
    return initialExpenses;
  }
};

function Expenses() {
  const [expenses, setExpenses] = useState(loadExpenses);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        EXPENSES_STORAGE_KEY,
        JSON.stringify(expenses)
      );
    } catch (error) {
      console.error("Failed to save expenses:", error);
    }
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return expenses.filter((expense) => {
      const title = String(expense.title ?? "").toLowerCase();
      const description = String(
        expense.description ?? ""
      ).toLowerCase();
      const expenseCategory = String(
        expense.category ?? ""
      ).toLowerCase();
      const expensePaymentMethod = String(
        expense.paymentMethod ?? ""
      ).toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        expenseCategory.includes(normalizedSearch) ||
        expensePaymentMethod.includes(normalizedSearch);

      const matchesCategory =
        category === "all" ||
        expense.category === category;

      const matchesPaymentMethod =
        paymentMethod === "all" ||
        expense.paymentMethod === paymentMethod;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPaymentMethod
      );
    });
  }, [expenses, search, category, paymentMethod]);

  const filteredTotal = filteredExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setModalOpen(true);
  };

  const handleDeleteExpense = (expense) => {
    const confirmed = window.confirm(
      `Delete "${expense.title}" from your expenses?`
    );

    if (!confirmed) {
      return;
    }

    setExpenses((current) =>
      current.filter((item) => item.id !== expense.id)
    );
  };

  const handleSubmitExpense = (formData) => {
    if (formData.id) {
      setExpenses((current) =>
        current.map((expense) =>
          expense.id === formData.id
            ? {
                ...expense,
                ...formData,
              }
            : expense
        )
      );
    } else {
      const newExpense = {
        ...formData,
        id:
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : Date.now(),
      };

      setExpenses((current) => [
        newExpense,
        ...current,
      ]);
    }

    setModalOpen(false);
    setSelectedExpense(null);
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("all");
    setPaymentMethod("all");
  };

  return (
    
      <div className="space-y-8">
        <BackButton />

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-black/45 dark:text-white/35">
              <ReceiptText
                size={16}
                strokeWidth={1.8}
              />

              <span className="text-xs font-medium uppercase tracking-[0.14em]">
                Transactions
              </span>
            </div>

            <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#171717] dark:text-white sm:text-3xl">
              Expenses
            </h1>

            <p className="mt-2 text-sm text-black/55 dark:text-white/45">
              Manage and review all your recorded expenses.
            </p>
          </div>

          <Button onClick={handleAddExpense}>
            <Plus size={16} strokeWidth={2} />
            Add expense
          </Button>
        </div>

        <ExpenseFilters
          search={search}
          category={category}
          paymentMethod={paymentMethod}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onPaymentMethodChange={setPaymentMethod}
          onReset={handleResetFilters}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-black/50 dark:text-white/40">
            Showing{" "}
            <span className="font-semibold text-black/75 dark:text-white/70">
              {filteredExpenses.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-black/75 dark:text-white/70">
              {expenses.length}
            </span>{" "}
            expenses
          </p>

          <p className="text-xs text-black/40 dark:text-white/30">
            Total: ₹{filteredTotal.toLocaleString("en-IN")}
          </p>
        </div>

        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />

        <ExpenseModal
          open={modalOpen}
          expense={selectedExpense}
          onClose={() => {
            setModalOpen(false);
            setSelectedExpense(null);
          }}
          onSubmit={handleSubmitExpense}
        />
      </div>
    
  );
}

export default Expenses;