
import { useState } from "react";
import { ArrowRight, MessageSquare, TrendingUp, Clock, Share2, Eye, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import ForumSidebar from "@/components/forum/ForumSidebar";
import ForumTopicList from "@/components/forum/ForumTopicList";

const categories = [
  { id: 1, name: "القانون المدني", icon: "⚖️", topicsCount: 156, postsCount: 1240 },
  { id: 2, name: "القانون الجزائي", icon: "⚖️", topicsCount: 98, postsCount: 876 },
  { id: 3, name: "القانون الدستوري", icon: "⚖️", topicsCount: 67, postsCount: 543 },
  { id: 4, name: "القانون التجاري", icon: "⚖️", topicsCount: 89, postsCount: 654 },
  { id: 5, name: "القانون الإداري", icon: "⚖️", topicsCount: 112, postsCount: 987 },
];

const CategoryView = () => {
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const category = categories.find(c => c.id === Number(categoryId));

  if (!category) {
    return <div>التصنيف غير موجود</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8 text-gray-600">
          <Link to="/forum" className="hover:text-blue-600 transition-colors">المنتدى</Link>
          <ArrowRight className="h-4 w-4" />
          <span className="text-blue-600">{category.name}</span>
        </div>

        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {category.name}
            </h1>
            <p className="text-gray-600 mt-2">
              {category.topicsCount} موضوع • {category.postsCount} مشاركة
            </p>
          </div>
          <Link to="/forum/new-topic">
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              + موضوع جديد
            </Button>
          </Link>
        </div>

        <div className="flex gap-6">
          <ForumSidebar categories={categories} />

          <div className="flex-1 space-y-6 animate-slide-up">
            <div className="relative bg-white rounded-lg shadow-md p-1">
              <Input
                placeholder="ابحث في المواضيع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 py-6 text-lg border-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <ForumTopicList selectedFilter="recent" searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
