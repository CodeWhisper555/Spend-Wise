import {
  LayoutDashboard,
  Receipt,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
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

function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur-lg transition-colors duration-300 dark:border-white/10 dark:bg-[#0d0d0d]/95 lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex min-w-[72px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-medium transition",
                  isActive
                    ? "bg-[#d9a928] text-[#090909]"
                    : "text-white/45 hover:bg-white/[0.06] hover:text-white",
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
  );
}

export default MobileNavigation;
