import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import categories from "../../data/categories";
import paymentMethods from "../../data/paymentMethods";

const getTodayDate = () => {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
};

const initialForm = {
  title: "",
  amount: "",
  category: "",
  paymentMethod: "",
  date: getTodayDate(),
  description: "",
};

const initialErrors = {};

const isStrictDate = (value) => {
  if (typeof value !== "string") {
    return false;
  }

  // Only YYYY-MM-DD is accepted
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  // Check whether the date actually exists
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const normalizeExistingDate = (value) => {
  if (!value) {
    return getTodayDate();
  }

  // Preserve only an already-valid strict date
  if (isStrictDate(value)) {
    return value;
  }

  // Convert common existing formats only when editing old data
  const match = String(value).match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/
  );

  if (match) {
    const [, first, second, year] = match;

    // Assumes old localized values are DD/MM/YYYY
    const converted = `${year}-${String(second).padStart(
      2,
      "0"
    )}-${String(first).padStart(2, "0")}`;

    return isStrictDate(converted) ? converted : getTodayDate();
  }

  return getTodayDate();
};

function ExpenseForm({ expense, onSubmit, onCancel, loading = false }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    if (expense) {
      setForm({
        title: expense.title || "",
        amount: expense.amount ?? "",
        category: expense.category || "",
        paymentMethod: expense.paymentMethod || "",
        date: normalizeExistingDate(expense.date),
        description: expense.description || "",
      });
    } else {
      setForm({
        ...initialForm,
        date: getTodayDate(),
      });
    }

    setErrors({});
  }, [expense]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    const title = form.title.trim();
    const amount = Number(form.amount);

    if (!title) {
      nextErrors.title = "Expense title is required.";
    } else if (title.length < 2) {
      nextErrors.title = "Expense title must contain at least 2 characters.";
    } else if (title.length > 100) {
      nextErrors.title = "Expense title cannot exceed 100 characters.";
    }

    if (form.amount === "") {
      nextErrors.amount = "Amount is required.";
    } else if (!Number.isFinite(amount)) {
      nextErrors.amount = "Enter a valid amount.";
    } else if (amount <= 0) {
      nextErrors.amount = "Amount must be greater than zero.";
    } else if (amount > 100000000) {
      nextErrors.amount = "Amount is too large.";
    }

    if (!form.category) {
      nextErrors.category = "Please select a category.";
    }

    if (!form.paymentMethod) {
      nextErrors.paymentMethod = "Please select a payment method.";
    }

    if (!form.date) {
      nextErrors.date = "Date is required.";
    } else if (!isStrictDate(form.date)) {
      nextErrors.date = "Date must use the format YYYY-MM-DD.";
    }

    if (form.description.length > 500) {
      nextErrors.description =
        "Description cannot exceed 500 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit?.({
      ...form,
      title: form.title.trim(),
      amount: Number(form.amount),
      date: form.date,
      description: form.description.trim(),
      id: expense?.id,
    });
  };

  const categoryOptions = categories.map((item) => ({
    label: item.name || item,
    value: item.name || item,
  }));

  const paymentMethodOptions = paymentMethods.map((item) => ({
    label: item.name || item,
    value: item.name || item,
  }));

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Input
            label="Expense title"
            value={form.title}
            onChange={(value) => updateField("title", value)}
            placeholder="e.g. Grocery shopping"
            required
          />

          {errors.title && (
            <p className="mt-1 text-xs text-red-400">{errors.title}</p>
          )}
        </div>

        <div>
          <Input
            label="Amount"
            inputType="number"
            value={form.amount}
            onChange={(value) => updateField("amount", value)}
            placeholder="e.g. 850"
            min="0.01"
            step="0.01"
            required
          />

          {errors.amount && (
            <p className="mt-1 text-xs text-red-400">{errors.amount}</p>
          )}
        </div>

        <div>
          <Select
            label="Category"
            value={form.category}
            onChange={(value) => updateField("category", value)}
            options={categoryOptions}
            placeholder="Select category"
            required
          />

          {errors.category && (
            <p className="mt-1 text-xs text-red-400">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <Select
            label="Payment method"
            value={form.paymentMethod}
            onChange={(value) => updateField("paymentMethod", value)}
            options={paymentMethodOptions}
            placeholder="Select payment method"
            required
          />

          {errors.paymentMethod && (
            <p className="mt-1 text-xs text-red-400">
              {errors.paymentMethod}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Date"
            inputType="date"
            value={form.date}
            onChange={(value) => updateField("date", value)}
            required
          />

          <p className="mt-1 text-xs text-white/40">
            Required format: YYYY-MM-DD
          </p>

          {errors.date && (
            <p className="mt-1 text-xs text-red-400">{errors.date}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-white/55">
          Description
        </label>

        <textarea
          value={form.description}
          onChange={(event) =>
            updateField("description", event.target.value)
          }
          placeholder="Add a short note about this expense..."
          rows={4}
          maxLength={500}
          className="w-full resize-none rounded-xl border border-white/[0.09] bg-white/[0.035] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d9a928]/60 focus:ring-2 focus:ring-[#d9a928]/10"
        />

        {errors.description && (
          <p className="mt-1 text-xs text-red-400">
            {errors.description}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={loading}>
          {expense ? "Update expense" : "Add expense"}
        </Button>
      </div>
    </form>
  );
}

export default ExpenseForm;