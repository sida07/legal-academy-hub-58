
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Share, Activity, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "محمد أحمد",
      content: "مقال رائع ومفيد جداً",
      date: "2024-03-18",
    },
    {
      id: 2,
      author: "سارة علي",
      content: "شكراً على هذه المعلومات القيمة",
      date: "2024-03-18",
    }
  ]);
  
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
    readTime: "5 دقائق",
    category: "القانون المدني",
    views: 1234,
    comments: 23
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + "...",
        url: window.location.href,
      });
    } catch (err) {
      toast({
        title: "نسخ الرابط",
        description: "تم نسخ رابط المقال إلى الحافظة",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast({
        title: "تنبيه",
        description: "الرجاء كتابة تعليق قبل الإرسال",
        variant: "destructive",
      });
      return;
    }

    const newComment = {
      id: comments.length + 1,
      author: "المستخدم",
      content: comment,
      date: new Date().toISOString().split('T')[0],
    };

    setComments([newComment, ...comments]);
    setComment("");
    
    toast({
      title: "تم إضافة التعليق",
      description: "شكراً على مشاركتك",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-4">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center">
                  <span className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ml-2 text-lg">
                    {post.author.charAt(0)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-[400px] object-cover" 
            />
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white shadow hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">المشاهدات</p>
                  <p className="text-lg font-semibold">{post.views}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white shadow hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">التعليقات</p>
                  <p className="text-lg font-semibold">{post.comments}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button 
                variant="outline" 
                className="flex items-center hover:bg-primary/5"
                onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageSquare className="h-4 w-4 ml-2" />
                التعليقات ({comments.length})
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center hover:bg-primary/5"
                onClick={handleShare}
              >
                <Share className="h-4 w-4 ml-2" />
                مشاركة
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          <div id="comments-section" className="space-y-6 pt-8">
            <h2 className="text-2xl font-bold">التعليقات</h2>
            
            {/* Add Comment */}
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
              <Textarea
                placeholder="اكتب تعليقك هنا..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button 
                className="w-full sm:w-auto"
                onClick={handleAddComment}
              >
                إضافة تعليق
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="p-4 bg-white">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          {comment.author.charAt(0)}
                        </span>
                        <span className="font-medium">{comment.author}</span>
                      </div>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;

