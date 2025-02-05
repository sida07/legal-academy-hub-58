import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const ExamView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "سؤال تجريبي 1",
      options: ["خيار 1", "خيار 2", "خيار 3"],
      correctAnswer: 0,
    },
  ]);

  // State for modals
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [editedText, setEditedText] = useState("");

  const handleAddQuestion = () => {
    toast({
      title: "إضافة سؤال جديد",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const handleEditClick = (question: Question) => {
    setSelectedQuestion(question);
    setEditedText(question.text);
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    if (selectedQuestion && editedText.trim()) {
      setQuestions(questions.map(q => 
        q.id === selectedQuestion.id ? { ...q, text: editedText } : q
      ));
      setIsEditDialogOpen(false);
      toast({
        title: "تم التعديل",
        description: "تم تعديل السؤال بنجاح",
      });
    }
  };

  const handleDeleteClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedQuestion) {
      setQuestions(questions.filter(q => q.id !== selectedQuestion.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "تم الحذف",
        description: "تم حذف السؤال بنجاح",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الأسئلة</h1>
        <Button onClick={handleAddQuestion} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة سؤال جديد
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الأسئلة المتوفرة في الاختبار {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>السؤال</TableHead>
                <TableHead>عدد الخيارات</TableHead>
                <TableHead>الإجابة الصحيحة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">{question.text}</TableCell>
                  <TableCell>{question.options.length}</TableCell>
                  <TableCell>الخيار {question.correctAnswer + 1}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(question)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteClick(question)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل السؤال</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="أدخل نص السؤال الجديد"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditConfirm}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا السؤال؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamView;