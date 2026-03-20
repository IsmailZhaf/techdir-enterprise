import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useTokenExpiry } from "@/hooks/useTokenExpiry";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useTokenExpiry();

    return (
        <div className="flex flex-col h-screen">
            <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
            <div className="flex flex-1 min-h-0">
                {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}
                {/* Sidebar */}
                <div
                    className={`
                    fixed z-30 h-full transition-transform duration-300 md:static md:translate-x-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
                >
                    <Sidebar onNavigate={() => setSidebarOpen(false)} />
                </div>
                <main className="w-full overflow-y-scroll p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
