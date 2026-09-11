import { Bell, Moon, Sun } from "lucide-react";

function Navbar({ theme = "dark", onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0d0d0d]/95 px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d9a928]/40 bg-[#d9a928]/10">
          <span className="font-display text-lg font-bold text-[#d9a928]">
            S
          </span>
        </div>

        <div>
          <p className="font-display text-lg font-bold tracking-tight text-white">
            Spend<span className="text-[#d9a928]">Wise</span>
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">
            Track smarter. Spend wiser.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <Bell size={18} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#d9a928] transition hover:border-[#d9a928]/40 hover:bg-[#d9a928]/10"
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