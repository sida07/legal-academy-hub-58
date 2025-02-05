
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Share } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  
  // Mock data for a single blog post
  const post = {
    id: 1,
    title: "مقدمة في القانون المدني",
    content: `
      يعد القانون المدني من أهم فروع القانون الخاص، حيث ينظم العلاقات بين الأفراد في المجتمع.
      
      يشمل القانون المدني عدة مجالات رئيسية:
      1. قانون الأشخاص والأسرة
      2. قانون الأموال والملكية
      3. قانون العقود والالتزامات
      4. قانون المسؤولية المدنية
      
      يهدف هذا المقال إلى تقديم شرح مبسط لهذه المفاهيم الأساسية وكيفية تطبيقها في الحياة اليومية.
    `,
    author: "د. أحمد محمد",
    date: "2024-03-15",
    image: "/placeholder.svg",
    readTime: "5 دقائق"
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
          
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex space-x-4 rtl:space-x-reverse">
                <Button variant="outline" className="flex items-center">
                  <MessageSquare className="h-4 w-4 ml-2" />
                  التعليقات
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Share className="h-4 w-4 ml-2" />
                  مشاركة
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
