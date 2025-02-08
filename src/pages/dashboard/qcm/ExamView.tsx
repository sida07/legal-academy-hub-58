
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Question, questionSchema } from "@/types/qcm";
import QuestionTable from "@/components/qcm/exam/QuestionTable";
import NewQuestionDialog from "@/components/qcm/exam/NewQuestionDialog";
import EditQuestionDialog from "@/components/qcm/exam/EditQuestionDialog";
import DeleteQuestionDialog from "@/components/qcm/exam/DeleteQuestionDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";

const ExamView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [year, examYear] = (id || '').split('-');

  // Dialog states
  const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [editedText, setEditedText] = useState("");

  // Get current user
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    }
  });

  // Fetch subject first
  const { data: subject } = useQuery({
    queryKey: ['subject', year],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('name', `اختبار سنة ${examYear}`)
        .single();

      if (error) throw error;
      return data;
    }
  });

  // Fetch questions
  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['questions', subject?.id],
    queryFn: async () => {
      if (!subject?.id) return [];
      
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('subject_id', subject.id)
        .eq('year', examYear);

      if (error) throw error;
      
      return data.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options as string[],
        correctAnswer: q.correct_answer,
      }));
    },
    enabled: !!subject?.id
  });

  // Add question mutation
  const addQuestionMutation = useMutation({
    mutationFn: async (values: z.infer<typeof questionSchema>) => {
      if (!session?.user?.id) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from('questions')
        .insert({
          text: values.text,
          options: [values.option1, values.option2, values.option3],
          correct_answer: parseInt(values.correctAnswer) - 1,
          subject_id: subject?.id,
          year: examYear,
          category: 'lawyer',
          user_id: session.user.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
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

  // Edit question mutation
  const editQuestionMutation = useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) => {
      const { error } = await supabase
        .from('questions')
        .update({ text })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      setIsEditDialogOpen(false);
      toast({
        title: "تم التعديل",
        description: "تم تعديل السؤال بنجاح",
      });
    }
  });

  // Delete question mutation
  const deleteQuestionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "تم الحذف",
        description: "تم حذف السؤال بنجاح",
      });
    }
  });

  const handleAddQuestion = (values: z.infer<typeof questionSchema>) => {
    addQuestionMutation.mutate(values);
  };

  const handleEditClick = (question: Question) => {
    setSelectedQuestion(question);
    setEditedText(question.text);
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    if (selectedQuestion && editedText.trim()) {
      editQuestionMutation.mutate({
        id: selectedQuestion.id,
        text: editedText
      });
    }
  };

  const handleDeleteClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedQuestion) {
      deleteQuestionMutation.mutate(selectedQuestion.id);
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

      <Card>
        <CardHeader>
          <CardTitle>الأسئلة المتوفرة في اختبار سنة {examYear}</CardTitle>
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
