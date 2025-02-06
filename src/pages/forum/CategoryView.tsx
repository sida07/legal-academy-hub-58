import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ForumCategory from "@/components/forum/ForumCategory";
import ForumSidebar from "@/components/forum/ForumSidebar";

const categories = [
  { id: 1, name: "القانون المدني", icon: "⚖️", topicsCount: 156, postsCount: 1240 },
  { id: 2, name: "القانون الجزائي", icon: "⚖️", topicsCount: 98, postsCount: 876 },
  { id: 3, name: "القانون الدستوري", icon: "⚖️", topicsCount: 67, postsCount: 543 },
  { id: 4, name: "القانون التجاري", icon: "⚖️", topicsCount: 89, postsCount: 654 },
  { id: 5, name: "القانون الإداري", icon: "⚖️", topicsCount: 112, postsCount: 987 },
  { id: 6, name: "قانون العمل", icon: "⚖️", topicsCount: 78, postsCount: 432 },
  { id: 7, name: "القانون الدولي", icon: "⚖️", topicsCount: 45, postsCount: 321 },
  { id: 8, name: "قانون الأسرة", icon: "⚖️", topicsCount: 134, postsCount: 876 }
];

const CategoryView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              التصنيفات القانونية
            </h1>
            <p className="text-gray-600 mt-2">اختر التصنيف الذي تريد استكشافه</p>
          </div>
        </div>

        <div className="flex gap-6">
          <ForumSidebar categories={categories} />

          <div className="flex-1 space-y-6 animate-slide-up">
            <div className="relative bg-white rounded-lg shadow-md p-1">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="ابحث في التصنيفات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 py-6 text-lg border-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/forum/category/${encodeURIComponent(category.name)}`}
                  className="transform transition-transform hover:scale-105"
                >
                  <ForumCategory
                    name={category.name}
                    icon={category.icon}
                    topicsCount={category.topicsCount}
                    postsCount={category.postsCount}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;