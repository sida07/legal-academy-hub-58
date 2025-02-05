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
    // More mock questions can be added here
  ]);

  const handleAddQuestion = () => {
    toast({
      title: "إضافة سؤال جديد",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const handleEditQuestion = (questionId: number) => {
    toast({
      title: "تعديل السؤال",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const handleDeleteQuestion = (questionId: number) => {
    toast({
      title: "حذف السؤال",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
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
                        onClick={() => handleEditQuestion(question.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteQuestion(question.id)}
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
    </div>
  );
};

export default ExamView;