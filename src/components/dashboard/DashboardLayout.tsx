import { 
  Settings, 
  Users, 
  BookOpen, 
  ClipboardList,
  UserCheck,
  Bell, 
  Search
} from "lucide-react";
import StatCard from "./StatCard";
import NotificationList from "./NotificationList";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
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
];

const userDistributionData = [
  { name: "طلاب جدد", value: 400 },
  { name: "طلاب نشطون", value: 300 },
  { name: "طلاب متخرجون", value: 300 },
];

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Admin Controls */}
            <Button variant="ghost" size="icon" className="relative group">
              <UserCheck className="h-5 w-5" />
              <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                حساب المشرف
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative group">
              <Users className="h-5 w-5" />
              <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                إدارة المستخدمين
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative group">
              <BookOpen className="h-5 w-5" />
              <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                إدارة الدورات التكوينية
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative group">
              <ClipboardList className="h-5 w-5" />
              <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                إدارة الاختبارات
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative group">
              <Settings className="h-5 w-5" />
              <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                إعدادات لوحة التحكم
              </span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="بحث..."
                className="pl-4 pr-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            title="المناقشات الجديدة"
            value="92"
            trend="+3%"
            trendDirection="up"
            icon="messageSquare"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">توزيع المستخدمين</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistributionData}
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
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">نشاط المستخدمين</h3>
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

        {/* Notifications Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">آخر التنبيهات</h3>
          <NotificationList />
        </Card>
      </main>
    </div>
  );
};

export default DashboardLayout;