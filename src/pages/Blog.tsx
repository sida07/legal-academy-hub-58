
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "مقدمة في القانون المدني",
    excerpt: "شرح مبسط لأساسيات القانون المدني وتطبيقاته في الحياة اليومية",
    author: "د. أحمد محمد",
    date: "2024-03-15",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "حقوق الملكية الفكرية",
    excerpt: "دليل شامل لفهم حقوق الملكية الفكرية وكيفية حمايتها",
    author: "د. سارة أحمد",
    date: "2024-03-14",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "قانون العمل الجديد",
    excerpt: "تحليل لأهم التغييرات في قانون العمل وتأثيرها على أصحاب العمل والموظفين",
    author: "د. محمد علي",
    date: "2024-03-13",
    image: "/placeholder.svg"
  }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post =>
    post.title.includes(searchQuery) || post.excerpt.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">المدونة القانونية</h1>
            <Button asChild>
              <Link to="/blog/new">إضافة مقال جديد</Link>
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="ابحث في المقالات..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/blog/${post.id}`}>
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
