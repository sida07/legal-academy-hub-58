import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import StatCard from "@/components/dashboard/StatCard";

const userActivityData = [
  { name: "يناير", value: 400 },
  { name: "فبراير", value: 300 },
  { name: "مارس", value: 600 },
  { name: "أبريل", value: 800 },
  { name: "مايو", value: 500 },
  { name: "يونيو", value: 700 },
];

const courseProgressData = [
  { name: "مشتركين", value: 60, color: "#4F46E5" },
  { name: "غير مشتركين", value: 40, color: "#E5E7EB" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي المستخدمين"
          value="1,234"
          trend="+12%"
          icon="users"
        />
        <StatCard
          title="الدورات النشطة"
          value="45"
          trend="+5%"
          icon="graduationCap"
        />
        <StatCard
          title="الاختبارات المجراة"
          value="867"
          trend="+8%"
          icon="fileCheck"
        />
        <StatCard
          title="نسبة النجاح"
          value="78%"
          trend="+3%"
          icon="clipboardCheck"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">نسبة المشتركين في الدورات</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseProgressData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#4F46E5"
                  opacity={0.9}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {courseProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
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
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: "#4F46E5" }}
                  opacity={0.9}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;