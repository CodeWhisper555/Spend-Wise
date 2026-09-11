import {
  MoreHorizontal,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react";
import Badge from "../ui/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

function ExpenseRow({ expense, onEdit, onDelete }) {
  return (
    <tr className="group transition hover:bg-slate-100 dark:hover:bg-white/[0.025]">
      <td className="px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-white/45">
            <ReceiptText size={18} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white/85">
              {expense.title}
            </p>

            {expense.description && (
              <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500 dark:text-white/35">
                {expense.description}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <Badge>{expense.category}</Badge>
      </td>

      <td className="px-6 py-4 text-sm text-slate-600 dark:text-white/55">
        {expense.paymentMethod || "—"}
      </td>

      <td className="px-6 py-4 text-sm text-slate-500 dark:text-white/50">
        {formatDate(expense.date)}
      </td>

      <td className="px-6 py-4 text-right">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatCurrency(expense.amount)}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit?.(expense)}
            aria-label={`Edit ${expense.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-[#d9a928] dark:text-white/35 dark:hover:bg-white/[0.07]"
          >
            <Pencil size={15} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(expense)}
            aria-label={`Delete ${expense.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-100 hover:text-red-600 dark:text-white/35 dark:hover:bg-red-400/10 dark:hover:text-red-400"
          >
            <Trash2 size={15} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label="More expense options"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:text-white/25 dark:hover:bg-white/[0.07] dark:hover:text-white/70"
          >
            <MoreHorizontal size={16} strokeWidth={1.8} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ExpenseRow;
