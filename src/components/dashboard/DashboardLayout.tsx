import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-right flex flex-row-reverse" dir="rtl">
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