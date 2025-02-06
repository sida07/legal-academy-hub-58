import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <SidebarProvider>
        <div className="flex flex-row-reverse">
          <AdminSidebar />
          <div className="flex-1 mr-64">
            <AdminHeader />
            <main className="max-w-7xl mx-auto p-6 mt-16">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;