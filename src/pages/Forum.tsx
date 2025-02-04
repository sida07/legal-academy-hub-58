
import { useState } from "react";
import { MessageSquare, TrendingUp, Clock, HelpCircle, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ForumCategory from "@/components/forum/ForumCategory";
import ForumTopicList from "@/components/forum/ForumTopicList";
import ForumSidebar from "@/components/forum/ForumSidebar";

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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">منتدى القانون</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            + سؤال جديد
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <ForumSidebar categories={categories} />

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ابحث في المنتدى..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter.id)}
                  className="flex items-center gap-2"
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
