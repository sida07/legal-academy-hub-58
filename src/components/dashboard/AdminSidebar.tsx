import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  FileText,
  User,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const links = [
    {
      href: "/dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/users",
      label: "المستخدمين",
      icon: Users,
    },
    {
      href: "/dashboard/courses",
      label: "الدورات",
      icon: BookOpen,
    },
    {
      href: "/dashboard/exams",
      label: "الاختبارات",
      icon: FileText,
    },
    {
      href: "/dashboard/settings",
      label: "الإعدادات",
      icon: Settings,
    },
    {
      href: "/dashboard/account",
      label: "حسابي",
      icon: User,
    },
  ];

  return (
    <div className="h-screen w-64 border-l bg-white p-4">
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100",
                isActive(link.href) && "bg-primary text-white hover:bg-primary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;