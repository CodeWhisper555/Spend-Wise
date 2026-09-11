function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-white text-[#171717] transition-colors duration-300 dark:bg-[#090909] dark:text-[#f5f5f5]">
      {children}
    </div>
  );
}

export default AppShell;