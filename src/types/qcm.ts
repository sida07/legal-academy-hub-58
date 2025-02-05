export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const questionSchema = z.object({
  text: z.string().min(1, "يجب إدخال نص السؤال"),
  option1: z.string().min(1, "يجب إدخال الخيار الأول"),
  option2: z.string().min(1, "يجب إدخال الخيار الثاني"),
  option3: z.string().min(1, "يجب إدخال الخيار الثالث"),
  correctAnswer: z.string().min(1, "يجب تحديد الإجابة الصحيحة"),
});