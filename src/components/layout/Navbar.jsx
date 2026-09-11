import { Bell, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ theme = "dark", onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 transition-colors duration-300 dark:border-white/10 dark:bg-[#0d0d0d]/95 sm:px-6">
      <div className="flex items-center gap-3">
        <Link to="/app" className="flex items-center gap-3">
          <img src="/favicon.svg" alt="SpendWise" className="h-9 w-9 rounded-xl object-contain shadow-sm" />
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Spend<span className="text-[#d9a928]">Wise</span>
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 sm:block">
              Track smarter. Spend wiser.
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-black/60 transition hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Bell size={18} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-black/[0.02] text-[#d9a928] transition hover:border-[#d9a928]/40 hover:bg-[#d9a928]/10 dark:border-white/10 dark:bg-white/[0.03]"
        >
          {isDark ? (
            <Sun size={18} strokeWidth={1.8} />
          ) : (
            <Moon size={18} strokeWidth={1.8} />
          )}
        </button>

        <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#d9a928] text-sm font-bold text-[#090909]">
          U
        </div>
      </div>
    </header>
  );
}

export default Navbar;
