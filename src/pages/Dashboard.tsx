import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  FileCheck,
  TrendingUp,
  Bell,
  AlertTriangle,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import NotificationList from "@/components/dashboard/NotificationList";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const userActivityData = [
  { name: "يناير", value: 400 },
  { name: "فبراير", value: 300 },
  { name: "مارس", value: 600 },
  { name: "أبريل", value: 800 },
  { name: "مايو", value: 500 },
  { name: "يونيو", value: 700 },
];

const courseProgressData = [
  { name: "مكتمل", value: 60 },
  { name: "قيد التقدم", value: 30 },
  { name: "لم يبدأ", value: 10 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي المستخدمين"
            value="1,234"
            trend="+12%"
            trendDirection="up"
            icon="users"
          />
          <StatCard
            title="الدورات النشطة"
            value="45"
            trend="+5%"
            trendDirection="up"
            icon="graduationCap"
          />
          <StatCard
            title="الاختبارات المجراة"
            value="867"
            trend="+8%"
            trendDirection="up"
            icon="fileCheck"
          />
          <StatCard
            title="نسبة النجاح"
            value="78%"
            trend="+3%"
            trendDirection="up"
            icon="messageSquare"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">نسبة التقدم في الدورات</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseProgressData}
                    dataKey="value"
                    nameKey="name"
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
        </div>

        {/* Notifications Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">التنبيهات الإدارية</h3>
          <NotificationList />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;