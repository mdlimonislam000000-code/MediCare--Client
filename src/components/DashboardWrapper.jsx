"use client";

import { useState } from "react";
import DashboardSideber from "@/components/DashboardSideber";
import { HiMenuAlt2 } from "react-icons/hi";

const DashboardWrapper = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background text-foreground relative overflow-hidden">
      
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#080c16]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 px-4 flex items-center justify-between z-40 shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-xl text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition cursor-pointer flex items-center gap-2"
          aria-label="Open Sidebar"
        >
          <HiMenuAlt2 className="text-2xl" />
          <span className="text-xs font-bold uppercase tracking-wider">Dashboard Menu</span>
        </button>
      </div>

      <DashboardSideber 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <main className="flex-1 p-6 overflow-y-auto mt-16 md:mt-0 w-full min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;