
import { MessageSquare } from "lucide-react";

interface ForumCategoryProps {
  name: string;
  icon: string;
  topicsCount: number;
  postsCount: number;
}

const ForumCategory = ({ name, icon, topicsCount, postsCount }: ForumCategoryProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{topicsCount} موضوع</span>
            <span>{postsCount} مشاركة</span>
          </div>
        </div>
        <MessageSquare className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default ForumCategory;
