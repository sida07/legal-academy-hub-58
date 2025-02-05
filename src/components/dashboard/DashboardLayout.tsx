import { Bell } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import StatCard from "./StatCard";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { Routes, Route } from "react-router-dom";
import UserManagement from "./users/UserManagement";

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

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-right flex" dir="rtl">
      <SidebarProvider>
        <AdminSidebar />
        <div className="flex-1 p-6">
          <AdminHeader />
          <main className="max-w-7xl mx-auto p-6">
            <Routes>
              <Route path="users" element={<UserManagement />} />
              <Route
                path="/"
                element={
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <StatCard title="إجمالي المستخدمين" value="1,234" trend="+12%" icon="users" />
                      <StatCard title="الدورات النشطة" value="45" trend="+5%" icon="graduationCap" />
                      <StatCard title="الاختبارات المجراة" value="867" trend="+8%" icon="fileCheck" />
                      <StatCard title="نسبة النجاح" value="78%" trend="+3%" icon="clipboardCheck" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">نسبة التقدم في الدورات</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie 
                                data={userDistributionData} 
                                dataKey="value" 
                                cx="50%" 
                                cy="50%" 
                                outerRadius={80} 
                                fill="#1E40AF" 
                              />
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </Card>
                      
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">معدل التسجيلات الشهرية</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userActivityData}>
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#1E40AF" 
                                strokeWidth={2} 
                              />
                              <Tooltip />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </Card>
                    </div>
                    
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">التنبيهات الإدارية</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <span>تم تسجيل مستخدم جديد</span>
                      </div>
                    </Card>
                  </>
                }
              />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;