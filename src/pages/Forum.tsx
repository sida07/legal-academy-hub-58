import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, TrendingUp, Clock, HelpCircle, User, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              العودة للرئيسية
            </Button>
          </Link>
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

            {/* Filter Buttons */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              <Button
                variant={selectedFilter === "popular" ? "default" : "outline"}
                onClick={() => setSelectedFilter("popular")}
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                المواضيع الأكثر شعبية
              </Button>
              <Button
                variant={selectedFilter === "recent" ? "default" : "outline"}
                onClick={() => setSelectedFilter("recent")}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                الأحدث
              </Button>
              <Button
                variant={selectedFilter === "unanswered" ? "default" : "outline"}
                onClick={() => setSelectedFilter("unanswered")}
                className="flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                الأسئلة غير المجابة
              </Button>
              <Button
                variant={selectedFilter === "my-topics" ? "default" : "outline"}
                onClick={() => setSelectedFilter("my-topics")}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                مواضيعي
              </Button>
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