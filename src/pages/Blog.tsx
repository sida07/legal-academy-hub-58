import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Zap, Activity, Home } from "lucide-react";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "مقدمة في القانون المدني",
    excerpt: "شرح مبسط لأساسيات القانون المدني وتطبيقاته في الحياة اليومية",
    author: "د. أحمد محمد",
    date: "2024-03-15",
    image: "/placeholder.svg",
    category: "القانون المدني",
    readTime: "5 دقائق"
  },
  {
    id: 2,
    title: "حقوق الملكية الفكرية",
    excerpt: "دليل شامل لفهم حقوق الملكية الفكرية وكيفية حمايتها",
    author: "د. سارة أحمد",
    date: "2024-03-14",
    image: "/placeholder.svg",
    category: "الملكية الفكرية",
    readTime: "7 دقائق"
  },
  {
    id: 3,
    title: "قانون العمل الجديد",
    excerpt: "تحليل لأهم التغييرات في قانون العمل وتأثيرها على أصحاب العمل والموظفين",
    author: "د. محمد علي",
    date: "2024-03-13",
    image: "/placeholder.svg",
    category: "قانون العمل",
    readTime: "6 دقائق"
  }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post =>
    post.title.includes(searchQuery) || post.excerpt.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                المدونة القانونية
              </h1>
              <p className="text-gray-600">اكتشف أحدث المقالات والتحليلات القانونية</p>
            </div>
            <div className="flex gap-4">
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="ابحث في المقالات..."
              className="pr-10 h-12 bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow bg-white bg-opacity-50 backdrop-blur">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">المقالات الأكثر قراءة</p>
                  <p className="text-2xl font-semibold">25+</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow bg-white bg-opacity-50 backdrop-blur">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">مقالات هذا الشهر</p>
                  <p className="text-2xl font-semibold">12</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow bg-white bg-opacity-50 backdrop-blur">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">إجمالي المقالات</p>
                  <p className="text-2xl font-semibold">150+</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-sm rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ml-2">
                          {post.author.charAt(0)}
                        </span>
                        {post.author}
                      </span>
                      <span>{post.readTime}</span>
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
