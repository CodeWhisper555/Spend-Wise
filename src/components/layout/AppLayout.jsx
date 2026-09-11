import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileNavigation from "./MobileNavigation";
import { useTheme } from "../../context/ThemeContext";

function AppLayout() {
  const { theme, toggleTheme } = useTheme();

  // Strict Authentication & Gmail Guard
  try {
    const storedUser = localStorage.getItem("spendwiseUser");
    if (!storedUser) {
      return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(storedUser);
    if (!user || !user.email || !user.email.toLowerCase().endsWith("@gmail.com")) {
      localStorage.removeItem("spendwiseUser");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem("spendwiseUser");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-white text-[#171717] dark:bg-[#090909] dark:text-white transition-colors duration-300">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 pb-28 lg:pb-12">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}

export default AppLayout;
