"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Activity,
  Users,
  Dna,
  Calendar,
  Clock,
  Download,
  Search,
} from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* Logo + Toggle */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2
            className={`font-bold text-orange-600 text-xl ${
              !sidebarOpen && "hidden"
            }`}
          >
            VMS
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-orange-100 transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar nav */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Activity, label: "Dashboard", page: "dashboard" as const },
            { icon: Users, label: "Users Management", page: "users" as const },
            {
              icon: Dna,
              label: "Most Predicted Disease",
              page: "disease" as const,
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setCurrentPage(item.page)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                currentPage === item.page
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <item.icon size={20} />
              <span className={`${!sidebarOpen && "hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-orange-600 capitalize">Admin</span>
          </h1>
          <p className="text-gray-600">
            {currentPage === "dashboard"
              ? "Here's what's happening with Derma AI today."
              : currentPage === "users"
              ? "Manage all registered users."
              : ""}
          </p>
        </div>

        {/* Conditional rendering */}
        {currentPage === "dashboard" ? (
          <div>hi</div>
        ) : currentPage === "users" ? (
          <div>hello</div>
        ) : currentPage === "disease" ? (
          <div> hdada</div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-2xl">Page not implemented yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminLayout;
