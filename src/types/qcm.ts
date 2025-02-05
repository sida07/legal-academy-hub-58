import { z } from "zod";

export type QCMCategory = "lawyer" | "subject" | "other";

export interface Subject {
  id: string;
  name: string;
  questionCount: number;
  participants: number;
  successRate: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category?: QCMCategory;
  subject?: string;
  year?: string;
}

export const questionSchema = z.object({
  text: z.string().min(1, "يجب إدخال نص السؤال"),
  option1: z.string().min(1, "يجب إدخال الخيار الأول"),
  option2: z.string().min(1, "يجب إدخال الخيار الثاني"),
  option3: z.string().min(1, "يجب إدخال الخيار الثالث"),
  correctAnswer: z.string().min(1, "يجب تحديد الإجابة الصحيحة"),
});

export type QuestionFormValues = z.infer<typeof questionSchema>;