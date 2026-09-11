import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppShell from "./AppShell";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-white text-[#171717] dark:bg-[#090909] dark:text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <AppShell>
          <Outlet />
        </AppShell>
      </main>
    </div>
  );
}

export default AppLayout;