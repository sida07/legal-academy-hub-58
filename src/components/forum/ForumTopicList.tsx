
import { MessageSquare, ThumbsUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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
    views: 15,
    timestamp: "قبل 3 ساعات",
    isFeatured: false,
  },
  {
    id: 2,
    title: "حقوق المستأجر في حالة إخلاء العقار",
    description: "ما هي حقوق المستأجر القانونية عندما يطلب المالك إخلاء...",
    category: "القانون المدني",
    votes: 42,
    replies: 456,
    views: 23,
    timestamp: "قبل 5 ساعات",
    isFeatured: true,
  },
];

const ForumTopicList = ({ selectedFilter, searchQuery }: ForumTopicListProps) => {
  return (
    <div className="space-y-4">
      {mockTopics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex gap-6">
            {/* Votes */}
            <div className="flex flex-col items-center justify-center w-20 text-center">
              <span className="text-xl font-semibold text-primary">+{topic.votes}</span>
              <span className="text-sm text-gray-500">تصويت</span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="text-primary">{topic.category}</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{topic.replies} مشاهدة</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{topic.views} رد</span>
                </div>
                {topic.isFeatured && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-500" />
                    <span>تم التثبيت</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumTopicList;
