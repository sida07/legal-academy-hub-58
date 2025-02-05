import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, BookOpen, GraduationCap } from "lucide-react";

const mockData = [
  { name: "يناير", students: 120 },
  { name: "فبراير", students: 180 },
  { name: "مارس", students: 250 },
  { name: "أبريل", students: 310 },
  { name: "مايو", students: 290 },
  { name: "يونيو", students: 350 },
];

const CourseStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">إجمالي الطلاب</p>
              <h3 className="text-2xl font-bold">1,500</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">الدورات النشطة</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">معدل إكمال الدورات</p>
              <h3 className="text-2xl font-bold">75%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">تسجيلات الطلاب الشهرية</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#1E40AF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default CourseStats;