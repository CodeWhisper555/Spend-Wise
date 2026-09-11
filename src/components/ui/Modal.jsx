import { X } from "lucide-react";
import { useEffect } from "react";
import Button from "./Button";

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm dark:bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={[
          "w-full rounded-2xl border bg-white text-[#171717] shadow-2xl",
          "border-black/[0.10]",
          "dark:border-white/10 dark:bg-[#151515] dark:text-[#f5f5f5]",
          sizeClasses[size] || sizeClasses.md,
        ].join(" ")}
      >
        <div className="flex items-start justify-between border-b border-black/[0.08] px-5 py-4 dark:border-white/10">
          <div>
            <h2
              id="modal-title"
              className="font-display text-lg font-semibold text-[#171717] dark:text-white"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-black/50 dark:text-white/45">
                {description}
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            className="h-8 w-8 px-0"
          >
            <X
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </Button>
        </div>

        <div className="px-5 py-5">{children}</div>

        {footer && (
          <div className="flex flex-wrap justify-end gap-3 border-t border-black/[0.08] px-5 py-4 dark:border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;