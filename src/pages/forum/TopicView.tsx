import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Share2, ThumbsUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";

const mockTopic = {
  id: 1,
  title: "كيفية تسجيل شركة تجارية جديدة؟",
  content: "أريد معرفة الإجراءات القانونية والأوراق المطلوبة لتسجيل شركة تجارية جديدة في المملكة. هل يمكن أن يساعدني أحد بتوضيح الخطوات والمتطلبات؟",
  category: "القانون التجاري",
  author: {
    name: "أحمد محمد",
    avatar: "https://i.pravatar.cc/150?u=ahmed"
  },
  timestamp: "قبل 3 ساعات",
  replies: [
    {
      id: 1,
      content: "يمكنني مساعدتك في هذا الأمر. أولاً، عليك تحديد نوع الشركة التي تريد تسجيلها...",
      author: {
        name: "سارة أحمد",
        avatar: "https://i.pravatar.cc/150?u=sara"
      },
      timestamp: "قبل ساعتين"
    }
  ]
};

// Mock authentication state - replace with actual auth logic later
const isAuthenticated = false;

const TopicView = () => {
  const { topicId } = useParams();
  const [replyContent, setReplyContent] = useState("");
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockTopic.title,
          text: mockTopic.content,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط الموضوع إلى الحافظة",
      });
    }
  };

  const handleReply = () => {
    if (!isAuthenticated) {
      toast({
        title: "تنبيه",
        description: "يجب تسجيل الدخول أولاً للتعليق",
        variant: "destructive",
      });
      return;
    }

    if (replyContent.trim()) {
      toast({
        title: "تم إضافة الرد",
        description: "تم إضافة ردك بنجاح",
      });
      setReplyContent("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8 text-gray-600">
          <Link to="/forum" className="hover:text-blue-600 transition-colors">المنتدى</Link>
          <ArrowRight className="h-4 w-4" />
          <Link to={`/forum/category/${mockTopic.category}`} className="hover:text-blue-600 transition-colors">
            {mockTopic.category}
          </Link>
          <ArrowRight className="h-4 w-4" />
          <span className="text-blue-600">{mockTopic.title}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={mockTopic.author.avatar}
              alt={mockTopic.author.name}
              className="w-12 h-12 rounded-full border-2 border-blue-100"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{mockTopic.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{mockTopic.author.name}</span>
                <span>•</span>
                <span>{mockTopic.timestamp}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{mockTopic.content}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 border-t pt-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>إعجاب</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span>مشاركة</span>
            </Button>
          </div>
        </div>

        <div className="space-y-6 mb-6">
          <h2 className="text-xl font-semibold">الردود</h2>
          {mockTopic.replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <div className="flex items-start gap-4">
                <img
                  src={reply.author.avatar}
                  alt={reply.author.name}
                  className="w-10 h-10 rounded-full border-2 border-blue-100"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="font-medium">{reply.author.name}</span>
                    <span>•</span>
                    <span>{reply.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{reply.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isAuthenticated ? (
          <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">أضف رداً</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="اكتب ردك هنا..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleReply}
                  className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="h-4 w-4 ml-2" />
                  إرسال الرد
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600 mb-4">يجب تسجيل الدخول للتعليق على هذا الموضوع</p>
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicView;