import { useState } from "react";
import { MessageSquare, TrendingUp, Clock, HelpCircle, User, Search, Share2, Eye, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ForumCategory from "@/components/forum/ForumCategory";
import ForumTopicList from "@/components/forum/ForumTopicList";
import ForumSidebar from "@/components/forum/ForumSidebar";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "القانون المدني", icon: "⚖️", topicsCount: 156, postsCount: 1240 },
  { id: 2, name: "القانون الجزائي", icon: "⚖️", topicsCount: 98, postsCount: 876 },
  { id: 3, name: "القانون الدستوري", icon: "⚖️", topicsCount: 67, postsCount: 543 },
  { id: 4, name: "القانون التجاري", icon: "⚖️", topicsCount: 89, postsCount: 654 },
  { id: 5, name: "القانون الإداري", icon: "⚖️", topicsCount: 112, postsCount: 987 },
];

const filters = [
  { id: "popular", label: "المواضيع الأكثر شعبية", icon: TrendingUp },
  { id: "recent", label: "الأحدث", icon: Clock },
  { id: "unanswered", label: "الأسئلة غير المجابة", icon: HelpCircle },
  { id: "myTopics", label: "مواضيعي", icon: User },
];

const Forum = () => {
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              منتدى القانون
            </h1>
            <p className="text-gray-600 mt-2">مكان للنقاش والتعلم في مجال القانون</p>
          </div>
          <div className="flex gap-4">
            <Link to="/forum/categories">
              <Button variant="outline" className="hover:bg-blue-50">
                <MessageSquare className="ml-2 h-5 w-5" />
                التصنيفات القانونية
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              + سؤال جديد
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <ForumSidebar categories={categories} />

          {/* Main Content */}
          <div className="flex-1 space-y-6 animate-slide-up">
            {/* Search */}
            <div className="relative bg-white rounded-lg shadow-md p-1">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="ابحث في المنتدى..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 py-6 text-lg border-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                    selectedFilter === filter.id
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      : "hover:border-blue-400"
                  }`}
                >
                  <filter.icon className="h-4 w-4" />
                  <span>{filter.label}</span>
                </Button>
              ))}
            </div>

            {/* Topics List */}
            <ForumTopicList selectedFilter={selectedFilter} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;