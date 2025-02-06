import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Building2,
  Gavel,
  Scale,
  BookOpen,
  LayoutDashboard,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ForumSidebarProps {
  categories: {
    id: number;
    name: string;
    icon: string;
    topicsCount: number;
    postsCount: number;
  }[];
}

const stats = [
  { label: "مستخدم نشط", value: "1.2K", icon: Users },
  { label: "موضوع", value: "5.6K", icon: MessageSquare },
  { label: "مشاركة", value: "23K", icon: TrendingUp },
];

const ForumSidebar = ({ categories }: ForumSidebarProps) => {
  return (
    <div className="hidden lg:flex lg:flex-col w-80 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">التصنيفات القانونية</h2>
        <nav className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/forum/category/${encodeURIComponent(category.name)}`}
              className="block w-full"
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-right mb-2 hover:bg-blue-50 hover:text-blue-600",
                  "transition-colors duration-200"
                )}
              >
                <span className="ml-3 text-xl">{category.icon}</span>
                <div className="flex flex-col items-start">
                  <span>{category.name}</span>
                  <span className="text-xs text-gray-500">
                    {category.topicsCount} موضوع • {category.postsCount} مشاركة
                  </span>
                </div>
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ForumSidebar;