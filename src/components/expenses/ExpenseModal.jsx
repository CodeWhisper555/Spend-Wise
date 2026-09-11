import Modal from "../ui/Modal";
import ExpenseForm from "./ExpenseForm";

function ExpenseModal({
  open,
  expense,
  onClose,
  onSubmit,
}) {
  const isEditing = Boolean(expense);

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={isEditing ? "Edit expense" : "Add expense"}
      description={
        isEditing
          ? "Update the details of this expense."
          : "Record a new expense in your account."
      }
    >
      <ExpenseForm
        expense={expense}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}

export default ExpenseModal;