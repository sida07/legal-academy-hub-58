import { Button } from "@/components/ui/button";
import { MessageSquare, Trash2, UserX } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ForumTopicListProps {
  searchQuery: string;
  onDeleteTopic: (topicId: string) => void;
  onBanUser: (userId: string) => void;
}

const mockTopics = [
  {
    id: "1",
    title: "كيفية تسجيل شركة تجارية جديدة؟",
    author: {
      id: "user1",
      name: "أحمد محمد",
    },
    category: "القانون التجاري",
    commentsCount: 15,
    createdAt: "2024-02-05",
  },
  {
    id: "2",
    title: "حقوق المستأجر في حالة إخلاء العقار",
    author: {
      id: "user2",
      name: "سارة أحمد",
    },
    category: "القانون المدني",
    commentsCount: 23,
    createdAt: "2024-02-04",
  },
];

const ForumTopicList = ({ searchQuery, onDeleteTopic, onBanUser }: ForumTopicListProps) => {
  const filteredTopics = mockTopics.filter(topic => 
    topic.title.includes(searchQuery) || 
    topic.author.name.includes(searchQuery) ||
    topic.category.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      {filteredTopics.map((topic) => (
        <div key={topic.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
              <div className="text-sm text-gray-500">
                <span>بواسطة: {topic.author.name}</span>
                <span className="mx-2">•</span>
                <span>{topic.category}</span>
                <span className="mx-2">•</span>
                <span>{topic.commentsCount} تعليق</span>
                <span className="mx-2">•</span>
                <span>{topic.createdAt}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>حذف الموضوع</AlertDialogTitle>
                    <AlertDialogDescription>
                      هل أنت متأكد من حذف هذا الموضوع؟ لا يمكن التراجع عن هذا الإجراء.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteTopic(topic.id)}>
                      حذف
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <UserX className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>حظر المستخدم</AlertDialogTitle>
                    <AlertDialogDescription>
                      هل أنت متأكد من حظر هذا المستخدم؟
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onBanUser(topic.author.id)}>
                      حظر
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumTopicList;