import { Bell } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import StatCard from "./StatCard";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { Routes, Route } from "react-router-dom";
import UserManagement from "./users/UserManagement";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const userActivityData = [
  { name: "يناير", value: 400 },
  { name: "فبراير", value: 300 },
  { name: "مارس", value: 600 },
  { name: "أبريل", value: 800 },
];

const userDistributionData = [
  { name: "طلاب جدد", value: 400 },
  { name: "طلاب نشطون", value: 300 },
  { name: "طلاب متخرجون", value: 300 },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-right flex" dir="rtl">
      <SidebarProvider>
        <AdminSidebar />
        <div className="flex-1 p-6">
          <AdminHeader />
          <main className="max-w-7xl mx-auto p-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;