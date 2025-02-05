import { LucideIcon, Users, GraduationCap, FileCheck, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: "users" | "graduationCap" | "fileCheck" | "messageSquare";
}

const iconMap = {
  users: Users,
  graduationCap: GraduationCap,
  fileCheck: FileCheck,
  messageSquare: MessageSquare,
};

const StatCard = ({ title, value, trend, trendDirection, icon }: StatCardProps) => {
  const Icon = iconMap[icon];
  const TrendIcon = trendDirection === "up" ? TrendingUp : TrendingDown;
  const trendColorClass = trendDirection === "up" ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-white p-6 rounded-lg shadow animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <Icon className="h-6 w-6 text-primary" />
        <div className="text-right">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
      <div className={`flex items-center gap-1 text-sm ${trendColorClass}`}>
        <TrendIcon className="h-4 w-4" />
        <span>{trend} مقارنة بالشهر السابق</span>
      </div>
    </div>
  );
};

export default StatCard;