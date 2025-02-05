import { Button } from "@/components/ui/button";
import { Trash2, UserX } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ForumCommentListProps {
  searchQuery: string;
  onDeleteComment: (commentId: string) => void;
  onBanUser: (userId: string) => void;
}

const mockComments = [
  {
    id: "1",
    content: "شكراً على هذه المعلومات القيمة",
    author: {
      id: "user1",
      name: "محمد علي",
    },
    topicTitle: "كيفية تسجيل شركة تجارية جديدة؟",
    createdAt: "2024-02-05",
  },
  {
    id: "2",
    content: "هل يمكن توضيح النقطة الثانية بشكل أكبر؟",
    author: {
      id: "user2",
      name: "فاطمة أحمد",
    },
    topicTitle: "حقوق المستأجر في حالة إخلاء العقار",
    createdAt: "2024-02-04",
  },
];

const ForumCommentList = ({ searchQuery, onDeleteComment, onBanUser }: ForumCommentListProps) => {
  const filteredComments = mockComments.filter(comment => 
    comment.content.includes(searchQuery) || 
    comment.author.name.includes(searchQuery) ||
    comment.topicTitle.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      {filteredComments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 mb-2">{comment.content}</p>
              <div className="text-sm text-gray-500">
                <span>بواسطة: {comment.author.name}</span>
                <span className="mx-2">•</span>
                <span>في موضوع: {comment.topicTitle}</span>
                <span className="mx-2">•</span>
                <span>{comment.createdAt}</span>
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
                    <AlertDialogTitle>حذف التعليق</AlertDialogTitle>
                    <AlertDialogDescription>
                      هل أنت متأكد من حذف هذا التعليق؟ لا يمكن التراجع عن هذا الإجراء.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteComment(comment.id)}>
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
                    <AlertDialogAction onClick={() => onBanUser(comment.author.id)}>
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

export default ForumCommentList;