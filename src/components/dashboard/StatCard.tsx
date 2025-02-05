import { LucideIcon, Users, GraduationCap, FileCheck, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: "users" | "graduationCap" | "fileCheck" | "clipboardCheck";
}

const iconMap: Record<StatCardProps["icon"], LucideIcon> = {
  users: Users,
  graduationCap: GraduationCap,
  fileCheck: FileCheck,
  clipboardCheck: ClipboardCheck,
};

const StatCard = ({ title, value, trend, icon }: StatCardProps) => {
  const Icon = iconMap[icon];
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <Icon className="h-6 w-6 text-primary" />
        <div className="text-right">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm text-green-500">{trend}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;