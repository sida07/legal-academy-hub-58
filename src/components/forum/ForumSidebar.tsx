
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building2, Gavel, Scale, BookOpen, LayoutDashboard } from "lucide-react";

interface ForumSidebarProps {
  categories: {
    id: number;
    name: string;
    icon: string;
    topicsCount: number;
    postsCount: number;
  }[];
}

const ForumSidebar = ({ categories }: ForumSidebarProps) => {
  return (
    <div className="hidden lg:block w-64 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">التصنيفات القانونية</h2>
      <nav className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-right mb-2 text-gray-700 hover:text-primary hover:bg-blue-50",
              "transition-colors duration-200"
            )}
          >
            <span className="ml-3 text-xl">{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default ForumSidebar;
