import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Ban, Flag, MessageSquare, Search, Trash2, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ForumTopicList from "./ForumTopicList";
import ForumCommentList from "./ForumCommentList";
import ForumReportList from "./ForumReportList";

const ForumDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleDeleteTopic = (topicId: string) => {
    console.log("Deleting topic:", topicId);
    toast({
      title: "تم حذف الموضوع",
      description: "تم حذف الموضوع بنجاح",
    });
  };

  const handleBanUser = (userId: string) => {
    console.log("Banning user:", userId);
    toast({
      title: "تم حظر المستخدم",
      description: "تم حظر المستخدم بنجاح",
    });
  };

  const handleDeleteComment = (commentId: string) => {
    console.log("Deleting comment:", commentId);
    toast({
      title: "تم حذف التعليق",
      description: "تم حذف التعليق بنجاح",
    });
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المنتدى</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="بحث..."
              className="pl-4 pr-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="topics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="topics" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            المواضيع
          </TabsTrigger>
          <TabsTrigger value="comments" className="gap-2">
            <Flag className="h-4 w-4" />
            التعليقات
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <Ban className="h-4 w-4" />
            البلاغات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="topics">
          <ForumTopicList searchQuery={searchQuery} onDeleteTopic={handleDeleteTopic} onBanUser={handleBanUser} />
        </TabsContent>

        <TabsContent value="comments">
          <ForumCommentList searchQuery={searchQuery} onDeleteComment={handleDeleteComment} onBanUser={handleBanUser} />
        </TabsContent>

        <TabsContent value="reports">
          <ForumReportList searchQuery={searchQuery} onBanUser={handleBanUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumDashboard;