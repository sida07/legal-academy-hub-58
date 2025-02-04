
import { MessageSquare, ThumbsUp } from "lucide-react";

interface ForumTopicListProps {
  selectedFilter: string;
  searchQuery: string;
}

const mockTopics = [
  {
    id: 1,
    title: "كيفية تحضير ملف قضية مدنية",
    author: "أحمد محمد",
    category: "القانون المدني",
    replies: 15,
    votes: 23,
    timestamp: "منذ ساعتين",
  },
  {
    id: 2,
    title: "استفسار حول إجراءات الطعن",
    author: "سارة أحمد",
    category: "القانون الجزائي",
    replies: 8,
    votes: 12,
    timestamp: "منذ 3 ساعات",
  },
  // Add more mock topics as needed
];

const ForumTopicList = ({ selectedFilter, searchQuery }: ForumTopicListProps) => {
  return (
    <div className="space-y-4">
      {mockTopics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{topic.author}</span>
                <span>{topic.category}</span>
                <span>{topic.timestamp}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{topic.replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{topic.votes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumTopicList;
