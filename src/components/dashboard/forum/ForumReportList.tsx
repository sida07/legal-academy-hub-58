import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ForumReportListProps {
  searchQuery: string;
  onBanUser: (userId: string) => void;
}

const mockReports = [
  {
    id: "1",
    reason: "محتوى غير لائق",
    reportedUser: {
      id: "user1",
      name: "خالد محمود",
    },
    content: "تعليق يحتوي على إساءة",
    reportedBy: "أحمد علي",
    createdAt: "2024-02-05",
  },
  {
    id: "2",
    reason: "سلوك عدواني",
    reportedUser: {
      id: "user2",
      name: "سمير حسن",
    },
    content: "رد غير مناسب على موضوع قانوني",
    reportedBy: "محمد سعيد",
    createdAt: "2024-02-04",
  },
];

const ForumReportList = ({ searchQuery, onBanUser }: ForumReportListProps) => {
  const filteredReports = mockReports.filter(report => 
    report.reason.includes(searchQuery) || 
    report.reportedUser.name.includes(searchQuery) ||
    report.content.includes(searchQuery) ||
    report.reportedBy.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      {filteredReports.map((report) => (
        <div key={report.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                  {report.reason}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{report.content}</p>
              <div className="text-sm text-gray-500">
                <span>المستخدم المبلغ عنه: {report.reportedUser.name}</span>
                <span className="mx-2">•</span>
                <span>المبلغ: {report.reportedBy}</span>
                <span className="mx-2">•</span>
                <span>{report.createdAt}</span>
              </div>
            </div>
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
                  <AlertDialogAction onClick={() => onBanUser(report.reportedUser.id)}>
                    حظر
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumReportList;