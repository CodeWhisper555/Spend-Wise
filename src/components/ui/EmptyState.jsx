import { Plus, ReceiptText } from "lucide-react";
import emptyExpensesImage from "../../assets/empty-expenses.svg";

function EmptyState({
  title = "No expenses yet",
  description = "Start adding your expenses to see them organized here.",
  actionLabel = "Add expense",
  onAction,
  showAction = true,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/[0.12] bg-black/[0.02] px-6 py-12 text-center dark:border-white/10 dark:bg-white/[0.02]">
      <img
        src={emptyExpensesImage}
        alt=""
        className="mb-5 h-36 w-48 object-contain opacity-90"
      />

      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9a928]/10 text-[#b88916] dark:text-[#d9a928]">
        <ReceiptText size={20} strokeWidth={1.8} />
      </div>

      <h3 className="font-display text-lg font-semibold text-[#171717] dark:text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-black/55 dark:text-white/45">
        {description}
      </p>

      {showAction && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#d9a928] px-4 text-sm font-semibold text-[#090909] transition hover:bg-[#c99a20] dark:hover:bg-[#e8bd4c]"
        >
          <Plus size={16} strokeWidth={2.2} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;