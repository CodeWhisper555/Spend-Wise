import { useMemo } from "react";
import { useExpenseContext } from "../context/ExpenseContext";

function useExpenses({
  search = "",
  category = "all",
  paymentMethod = "all",
} = {}) {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    totalSpent,
  } = useExpenseContext();

  const filteredExpenses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return expenses.filter((expense) => {
      const title = expense.title?.toLowerCase() || "";
      const description = expense.description?.toLowerCase() || "";

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch);

      const matchesCategory =
        category === "all" || expense.category === category;

      const matchesPaymentMethod =
        paymentMethod === "all" ||
        expense.paymentMethod === paymentMethod;

      return matchesSearch && matchesCategory && matchesPaymentMethod;
    });
  }, [expenses, search, category, paymentMethod]);

  const getExpenseById = (expenseId) => {
    return expenses.find((expense) => expense.id === expenseId);
  };

  return {
    expenses,
    filteredExpenses,
    totalSpent,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
  };
}

export default useExpenses;