import { createContext, useContext, useMemo, useState } from "react";

const ExpenseContext = createContext(null);

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

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpense = (expense) => {
    setExpenses((currentExpenses) => [
      {
        ...expense,
        id: Date.now(),
        amount: Number(expense.amount),
      },
      ...currentExpenses,
    ]);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? {
              ...expense,
              ...updatedExpense,
              amount: Number(updatedExpense.amount),
            }
          : expense
      )
    );
  };

  const deleteExpense = (expenseId) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId)
    );
  };

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

  const value = {
    expenses,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    totalSpent,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenseContext must be used within an ExpenseProvider"
    );
  }

  return context;
}