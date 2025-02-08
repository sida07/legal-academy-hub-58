
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Question, questionSchema } from "@/types/qcm";
import { z } from "zod";

export const useQuestions = (subjectId: string | undefined, examYear: string) => {
  const queryClient = useQueryClient();

  const questionsQuery = useQuery({
    queryKey: ['questions', subjectId],
    queryFn: async () => {
      if (!subjectId) return [];
      
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('subject_id', subjectId)
        .eq('year', examYear);

      if (error) throw error;
      
      return data.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options as string[],
        correctAnswer: q.correct_answer,
      }));
    },
    enabled: !!subjectId
  });

  const addQuestionMutation = useMutation({
    mutationFn: async (values: z.infer<typeof questionSchema>) => {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.user?.id) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from('questions')
        .insert({
          text: values.text,
          options: [values.option1, values.option2, values.option3],
          correct_answer: parseInt(values.correctAnswer) - 1,
          subject_id: subjectId,
          year: examYear,
          category: 'lawyer',
          user_id: session.data.session.user.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    }
  });

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
    }
  });

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
    }
  });

  return {
    questions: questionsQuery.data || [],
    isLoading: questionsQuery.isLoading,
    addQuestion: addQuestionMutation.mutate,
    editQuestion: editQuestionMutation.mutate,
    deleteQuestion: deleteQuestionMutation.mutate
  };
};
