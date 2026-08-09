"use client";

import { useState } from "react";
import DashboardSideber from "@/components/DashboardSideber";
import { HiMenuAlt2 } from "react-icons/hi";

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='min-h-screen flex container mx-auto bg-background text-foreground relative'>
            
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#080c16] border-b border-gray-200 dark:border-white/10 px-4 flex items-center justify-between z-40">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 rounded-xl text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition cursor-pointer"
                >
                    <HiMenuAlt2 className="text-2xl" />
                </button>
                <span className="font-bold text-sm">Dashboard</span>
                <div className="w-8"></div>
            </div>

            <DashboardSideber 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
            />

            <main className='flex-1 p-6 overflow-y-auto mt-16 md:mt-0'>
                {children}
            </main>
        </div>
    );
};

export default Layout;