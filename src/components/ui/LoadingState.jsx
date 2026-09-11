import { LoaderCircle } from "lucide-react";

function LoadingState({
  message = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={[
        "flex items-center justify-center gap-3 text-white/50",
        fullScreen ? "min-h-screen" : "min-h-40",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        size={20}
        strokeWidth={1.8}
        className="animate-spin text-[#d9a928]"
      />

      <span className="text-sm">{message}</span>
    </div>
  );
}

export default LoadingState;