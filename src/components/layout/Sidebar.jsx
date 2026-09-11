import {
  LayoutDashboard,
  Receipt,
  Settings,
  WalletCards,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/app",
    icon: LayoutDashboard,
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: Receipt,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-black/[0.08] bg-[#f8f8f6] px-4 py-6 lg:flex dark:border-white/10 dark:bg-[#0d0d0d]">
      <div className="mb-8 rounded-2xl border border-[#d9a928]/25 bg-[#d9a928]/[0.06] p-4 dark:border-[#d9a928]/20 dark:bg-[#d9a928]/5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9a928] text-[#090909]">
          <WalletCards size={21} strokeWidth={2.2} />
        </div>

        <h2 className="font-display text-sm font-semibold text-[#171717] dark:text-white">
          Your money, organized.
        </h2>

        <p className="mt-1 text-xs leading-5 text-black/50 dark:text-white/45">
          Keep track of every expense and make smarter financial decisions.
        </p>
      </div>

      <nav aria-label="Primary navigation">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35 dark:text-white/30">
          Workspace
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-[#d9a928] text-[#090909]"
                      : "text-black/60 hover:bg-black/[0.05] hover:text-[#171717] dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white",
                  ].join(" ")
                }
              >
                <Icon size={18} strokeWidth={1.9} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto pt-10">
        <div className="rounded-xl border border-black/[0.08] bg-black/[0.025] px-3 py-3 dark:border-white/10 dark:bg-white/[0.025]">
          <p className="text-xs font-medium text-black/70 dark:text-white/70">
            SpendWise v1.0
          </p>

          <p className="mt-1 text-[11px] text-black/40 dark:text-white/35">
            Built for better spending habits.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
