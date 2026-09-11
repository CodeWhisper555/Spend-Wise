import { Filter, RotateCcw, Search } from "lucide-react";

import Input from "../ui/Input";
import Select from "../ui/Select";
import categories from "../../data/categories";
import paymentMethods from "../../data/paymentMethods";

function ExpenseFilters({
  search,
  category,
  paymentMethod,
  onSearchChange,
  onCategoryChange,
  onPaymentMethodChange,
  onReset,
}) {
  const categoryOptions = [
    { label: "All categories", value: "all" },
    ...categories.map((item) => ({
      label: item.name || item,
      value: item.name || item,
    })),
  ];

  const paymentMethodOptions = [
    { label: "All payment methods", value: "all" },
    ...paymentMethods.map((item) => ({
      label: item.name || item,
      value: item.name || item,
    })),
  ];

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-black/[0.025] p-4 transition-colors duration-300 dark:border-white/[0.07] dark:bg-white/[0.025]">
      <div className="mb-4 flex items-center gap-2">
        <Filter
          size={16}
          className="text-[#b88912] dark:text-[#d9a928]"
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
          Filter expenses
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_1fr_1fr_auto] md:items-end">
        <div>
          <label className="mb-2 block text-xs font-medium text-black/50 dark:text-white/45">
            Search
          </label>

          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35 dark:text-white/30"
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <Input
              value={search}
              onChange={onSearchChange}
              placeholder="Search expenses..."
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-black/50 dark:text-white/45">
            Category
          </label>

          <Select
            value={category}
            onChange={onCategoryChange}
            options={categoryOptions}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-black/50 dark:text-white/45">
            Payment method
          </label>

          <Select
            value={paymentMethod}
            onChange={onPaymentMethodChange}
            options={paymentMethodOptions}
          />
        </div>

        <button
          type="button"
          onClick={onReset}
          className={[
            "inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-semibold",
            "border-black/[0.10] text-black/60",
            "transition duration-200",
            "hover:border-black/[0.18] hover:bg-black/[0.04] hover:text-[#171717]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a928]/50",
            "dark:border-white/[0.08] dark:text-white/55",
            "dark:hover:border-white/[0.15] dark:hover:bg-white/[0.05] dark:hover:text-white",
          ].join(" ")}
        >
          <RotateCcw
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          Reset
        </button>
      </div>
    </div>
  );
}

export default ExpenseFilters;