
import { MessageSquare, ThumbsUp, Star, Share2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ForumTopicListProps {
  selectedFilter: string;
  searchQuery: string;
}

const mockTopics = [
  {
    id: 1,
    title: "كيفية تسجيل شركة تجارية جديدة؟",
    description: "أريد معرفة الإجراءات القانونية والأوراق المطلوبة لتسجيل شركة...",
    category: "القانون التجاري",
    votes: 25,
    replies: 234,
    views: 1520,
    timestamp: "قبل 3 ساعات",
    isFeatured: false,
    author: {
      name: "أحمد محمد",
      avatar: "https://i.pravatar.cc/150?u=ahmed"
    }
  },
  {
    id: 2,
    title: "حقوق المستأجر في حالة إخلاء العقار",
    description: "ما هي حقوق المستأجر القانونية عندما يطلب المالك إخلاء...",
    category: "القانون المدني",
    votes: 42,
    replies: 456,
    views: 2300,
    timestamp: "قبل 5 ساعات",
    isFeatured: true,
    author: {
      name: "سارة أحمد",
      avatar: "https://i.pravatar.cc/150?u=sara"
    }
  },
];

const ForumTopicList = ({ selectedFilter, searchQuery }: ForumTopicListProps) => {
  const { toast } = useToast();

  const handleShare = async (topic: typeof mockTopics[0], e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: topic.title,
          text: topic.description,
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

  return (
    <div className="space-y-4">
      {mockTopics.map((topic) => (
        <Link
          key={topic.id}
          to={`/forum/topic/${topic.id}`}
          className="block transition-transform hover:scale-[1.01]"
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={topic.author.avatar}
                  alt={topic.author.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-100"
                />
                <span className="text-sm text-gray-600">{topic.author.name}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-xl mb-2 hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{topic.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                    {topic.category}
                  </span>
                  
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{topic.votes}</span>
                    </Button>

                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{topic.replies} رد</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{topic.views} مشاهدة</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 hover:text-blue-600"
                      onClick={(e) => handleShare(topic, e)}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>مشاركة</span>
                    </Button>
                  </div>

                  <span className="text-gray-500">{topic.timestamp}</span>

                  {topic.isFeatured && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span>مثبت</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ForumTopicList;
