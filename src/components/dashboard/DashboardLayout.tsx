import StatCard from "./StatCard";
import NotificationList from "./NotificationList";
import AdminHeader from "./AdminHeader";
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
      <AdminHeader />
      
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