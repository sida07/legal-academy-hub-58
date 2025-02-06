import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ForumSidebar from "@/components/forum/ForumSidebar";
import ForumTopicList from "@/components/forum/ForumTopicList";

const categories = [
  { id: 1, name: "القانون المدني", icon: "⚖️", topicsCount: 156, postsCount: 1240 },
  { id: 2, name: "القانون الجزائي", icon: "⚖️", topicsCount: 98, postsCount: 876 },
  { id: 3, name: "القانون التجاري", icon: "⚖️", topicsCount: 89, postsCount: 654 },
  { id: 4, name: "القانون الدستوري", icon: "⚖️", topicsCount: 67, postsCount: 543 },
  { id: 5, name: "القانون الإداري", icon: "⚖️", topicsCount: 112, postsCount: 987 },
];

const Forum = () => {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("recent");

  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : null;
  const currentCategory = categories.find(cat => cat.name === decodedCategoryName);

  console.log("Current category:", decodedCategoryName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {currentCategory ? currentCategory.name : "المنتدى القانوني"}
            </h1>
            <p className="text-gray-600 mt-2">
              {currentCategory 
                ? `${currentCategory.topicsCount} موضوع • ${currentCategory.postsCount} مشاركة`
                : "منصة للنقاش القانوني وتبادل الخبرات"}
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <ForumSidebar categories={categories} />

          <div className="flex-1 space-y-6">
            <div className="relative bg-white rounded-lg shadow-md p-1">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="ابحث في المواضيع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 py-6 text-lg border-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <ForumTopicList
              selectedFilter={selectedFilter}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;