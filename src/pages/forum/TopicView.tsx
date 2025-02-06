import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare, Share2, ThumbsUp, Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const topicData = {
  id: "1",
  title: "سؤال حول القانون التجاري",
  content: "ما هي الشروط الأساسية لتأسيس شركة تجارية في المغرب؟",
  author: {
    id: "123",
    name: "محمد علي",
    avatar: "https://i.pravatar.cc/150?u=mohamed"
  },
  timestamp: "منذ 3 ساعات",
  replies: [
    {
      id: "1",
      content: "يجب عليك أولاً تحديد نوع الشركة التي تريد تأسيسها...",
      author: {
        id: "456",
        name: "سارة أحمد",
        avatar: "https://i.pravatar.cc/150?u=sara"
      },
      timestamp: "قبل ساعتين",
      image: null
    }
  ]
};

const TopicView = () => {
  const isAuthenticated = true;
  const { topicId } = useParams();
  const [replyContent, setReplyContent] = useState("");
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [replyImagePreview, setReplyImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط الموضوع إلى الحافظة",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReplyImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReplyImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة رد قبل الإرسال",
        variant: "destructive",
      });
      return;
    }
    // Handle reply submission
    toast({
      title: "تم إرسال الرد",
      description: "تمت إضافة ردك بنجاح",
    });
    setReplyContent("");
    setReplyImage(null);
    setReplyImagePreview(null);
  };

  const navigateToUserProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link to="/forum" className="text-[#6E59A5] hover:text-[#8B5CF6] flex items-center gap-2 mb-4">
          <ArrowRight className="h-4 w-4" />
          العودة إلى المنتدى
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start gap-4">
          <img
            src={topicData.author.avatar}
            alt={topicData.author.name}
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={() => navigateToUserProfile(topicData.author.id)}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-semibold mb-1">{topicData.title}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span 
                    className="font-medium text-[#6E59A5] cursor-pointer hover:text-[#8B5CF6]"
                    onClick={() => navigateToUserProfile(topicData.author.id)}
                  >
                    {topicData.author.name}
                  </span>
                  <span>•</span>
                  <span>{topicData.timestamp}</span>
                </div>
              </div>
              <Button variant="ghost" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-700">{topicData.content}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {topicData.replies.map((reply) => (
          <div key={reply.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <img
                src={reply.author.avatar}
                alt={reply.author.name}
                className="w-12 h-12 rounded-full cursor-pointer"
                onClick={() => navigateToUserProfile(reply.author.id)}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span 
                      className="font-medium text-[#6E59A5] cursor-pointer hover:text-[#8B5CF6]"
                      onClick={() => navigateToUserProfile(reply.author.id)}
                    >
                      {reply.author.name}
                    </span>
                    <span>•</span>
                    <span>{reply.timestamp}</span>
                  </div>
                </div>
                <p className="text-gray-700">{reply.content}</p>
                {reply.image && (
                  <img 
                    src={reply.image} 
                    alt="صورة مرفقة" 
                    className="mt-4 max-w-full h-auto rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">إضافة رد</h3>
          {isAuthenticated ? (
            <div className="space-y-4">
              <Textarea
                placeholder="اكتب ردك هنا..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 text-[#6E59A5] hover:text-[#8B5CF6]">
                    <Image className="h-5 w-5" />
                    <span>إضافة صورة</span>
                  </div>
                </label>
                {replyImagePreview && (
                  <div className="relative">
                    <img
                      src={replyImagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded"
                    />
                    <button
                      onClick={() => {
                        setReplyImage(null);
                        setReplyImagePreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleReply}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  إرسال الرد
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-2">يجب تسجيل الدخول لإضافة رد</p>
              <Button variant="outline">تسجيل الدخول</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicView;