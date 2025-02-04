
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <nav>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="w-full justify-start text-right mb-2"
          >
            <span className="ml-2">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default ForumSidebar;
