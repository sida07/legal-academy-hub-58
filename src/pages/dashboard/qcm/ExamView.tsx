
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Question, questionSchema } from "@/types/qcm";
import NewQuestionDialog from "@/components/qcm/exam/NewQuestionDialog";
import EditQuestionDialog from "@/components/qcm/exam/EditQuestionDialog";
import DeleteQuestionDialog from "@/components/qcm/exam/DeleteQuestionDialog";
import QuestionsList from "@/components/qcm/exam/QuestionsList";
import { useSubject } from "@/hooks/useSubject";
import { useQuestions } from "@/hooks/useQuestions";
import * as z from "zod";

const ExamView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [year, examYear] = (id || '').split('-');

  // Dialog states
  const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [editedText, setEditedText] = useState("");

  // Fetch subject first
  const { data: subject } = useSubject(year, examYear);

  // Use questions hook
  const { questions, isLoading, addQuestion, editQuestion, deleteQuestion } = useQuestions(subject?.id, examYear);

  const handleAddQuestion = (values: z.infer<typeof questionSchema>) => {
    addQuestion(values, {
      onSuccess: () => {
        setIsNewQuestionDialogOpen(false);
        toast({
          title: "تمت الإضافة",
          description: "تم إضافة السؤال بنجاح",
        });
      },
      onError: (error) => {
        console.error('Error adding question:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء إضافة السؤال",
          variant: "destructive",
        });
      }
    });
  };

  const handleEditClick = (question: Question) => {
    setSelectedQuestion(question);
    setEditedText(question.text);
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    if (selectedQuestion && editedText.trim()) {
      editQuestion(
        { id: selectedQuestion.id, text: editedText },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            toast({
              title: "تم التعديل",
              description: "تم تعديل السؤال بنجاح",
            });
          }
        }
      );
    }
  };

  const handleDeleteClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedQuestion) {
      deleteQuestion(selectedQuestion.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          toast({
            title: "تم الحذف",
            description: "تم حذف السؤال بنجاح",
          });
        }
      });
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الأسئلة</h1>
        <Button onClick={() => setIsNewQuestionDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة سؤال جديد
        </Button>
      </div>

      <QuestionsList
        examYear={examYear}
        questions={questions}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <NewQuestionDialog
        open={isNewQuestionDialogOpen}
        onOpenChange={setIsNewQuestionDialogOpen}
        onSubmit={handleAddQuestion}
      />

      <EditQuestionDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        question={selectedQuestion}
        editedText={editedText}
        onEditTextChange={setEditedText}
        onConfirm={handleEditConfirm}
      />

      <DeleteQuestionDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ExamView;
