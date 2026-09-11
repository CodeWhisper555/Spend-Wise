import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";
import ExpenseRow from "./ExpenseRow";

function ExpenseTable({ expenses = [], onEdit, onDelete }) {
  return (
    <Card className="overflow-hidden p-0">
      {expenses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-black/[0.08] bg-black/[0.025] text-left dark:border-white/[0.07] dark:bg-white/[0.02]">
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/35">
                  Expense
                </th>

                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/35">
                  Category
                </th>

                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/35">
                  Payment method
                </th>

                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/35">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/35">
                  Amount
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/35">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-black/[0.08] dark:divide-white/[0.07]">
              {expenses.map((expense) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-12">
          <EmptyState
            title="No expenses found"
            description="Your added expenses will appear here."
          />
        </div>
      )}
    </Card>
  );
}

export default ExpenseTable;