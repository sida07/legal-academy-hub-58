import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/qcm";
import QuestionTable from "@/components/qcm/exam/QuestionTable";
import NewQuestionDialog from "@/components/qcm/exam/NewQuestionDialog";
import EditQuestionDialog from "@/components/qcm/exam/EditQuestionDialog";
import DeleteQuestionDialog from "@/components/qcm/exam/DeleteQuestionDialog";
import * as z from "zod";

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

  // Dialog states
  const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [editedText, setEditedText] = useState("");

  const handleAddQuestion = (values: z.infer<typeof questionSchema>) => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: values.text,
      options: [values.option1, values.option2, values.option3],
      correctAnswer: parseInt(values.correctAnswer) - 1,
    };

    setQuestions([...questions, newQuestion]);
    setIsNewQuestionDialogOpen(false);
    
    toast({
      title: "تمت الإضافة",
      description: "تم إضافة السؤال بنجاح",
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
        <Button onClick={() => setIsNewQuestionDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة سؤال جديد
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الأسئلة المتوفرة في الاختبار {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <QuestionTable
            questions={questions}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </CardContent>
      </Card>

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