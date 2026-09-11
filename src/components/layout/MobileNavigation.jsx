import { LayoutDashboard, Receipt, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

function MobileNavigation() {
  const navItems = [
    {
      title: "Dashboard",
      path: "/app",
      icon: LayoutDashboard,
    },
    {
      title: "Expenses",
      path: "/expenses",
      icon: Receipt,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-2 backdrop-blur-md transition-colors duration-300 lg:hidden dark:border-white/10 dark:bg-[#0d0d0d]/95">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center py-1.5 transition-colors ${
                isActive
                  ? "text-[#d9a928]"
                  : "text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="mt-1 text-[11px] font-medium tracking-tight">
                  {item.title}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default MobileNavigation;
