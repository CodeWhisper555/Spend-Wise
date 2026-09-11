import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton({ label = "Back", className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={[
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium",
        "border-black/[0.10] text-black/60",
        "transition duration-200",
        "hover:border-black/[0.18] hover:bg-black/[0.04] hover:text-[#171717]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a928]/50",
        "dark:border-white/[0.08] dark:text-white/60",
        "dark:hover:border-white/[0.16] dark:hover:bg-white/[0.05] dark:hover:text-white",
        className,
      ].join(" ")}
    >
      <ArrowLeft
        size={16}
        strokeWidth={1.8}
        aria-hidden="true"
      />

      {label}
    </button>
  );
}

export default BackButton;