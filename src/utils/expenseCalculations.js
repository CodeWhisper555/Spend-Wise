export function calculateTotalExpenses(expenses = []) {
  return expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );
}

export function calculateAverageExpense(expenses = []) {
  if (expenses.length === 0) {
    return 0;
  }

  return calculateTotalExpenses(expenses) / expenses.length;
}

export function calculateCategoryTotals(expenses = []) {
  return expenses.reduce((totals, expense) => {
    const category = expense.category || "Other";
    const amount = Number(expense.amount || 0);

    totals[category] = (totals[category] || 0) + amount;

    return totals;
  }, {});
}

export function calculateCategoryPercentages(expenses = []) {
  const total = calculateTotalExpenses(expenses);
  const categoryTotals = calculateCategoryTotals(expenses);

  if (total === 0) {
    return {};
  }

  return Object.entries(categoryTotals).reduce(
    (percentages, [category, amount]) => {
      percentages[category] = Number(((amount / total) * 100).toFixed(2));
      return percentages;
    },
    {}
  );
}

export function calculateBudgetProgress(spent = 0, budget = 0) {
  const numericSpent = Number(spent) || 0;
  const numericBudget = Number(budget) || 0;

  if (numericBudget <= 0) {
    return 0;
  }

  return Math.min((numericSpent / numericBudget) * 100, 100);
}

export function calculateRemainingBudget(spent = 0, budget = 0) {
  return Math.max(Number(budget || 0) - Number(spent || 0), 0);
}

export function getHighestExpense(expenses = []) {
  if (expenses.length === 0) {
    return null;
  }

  return expenses.reduce((highest, expense) => {
    return Number(expense.amount || 0) > Number(highest.amount || 0)
      ? expense
      : highest;
  });
}

export function getRecentExpenses(expenses = [], limit = 5) {
  return [...expenses]
    .sort((first, second) => {
      return new Date(second.date) - new Date(first.date);
    })
    .slice(0, limit);
}