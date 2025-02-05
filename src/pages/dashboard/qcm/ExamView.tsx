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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const questionSchema = z.object({
  text: z.string().min(1, "يجب إدخال نص السؤال"),
  option1: z.string().min(1, "يجب إدخال الخيار الأول"),
  option2: z.string().min(1, "يجب إدخال الخيار الثاني"),
  option3: z.string().min(1, "يجب إدخال الخيار الثالث"),
  correctAnswer: z.string().min(1, "يجب تحديد الإجابة الصحيحة"),
});

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
  const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [editedText, setEditedText] = useState("");

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: "",
      option1: "",
      option2: "",
      option3: "",
      correctAnswer: "",
    },
  });

  const handleAddQuestion = () => {
    setIsNewQuestionDialogOpen(true);
  };

  const onSubmitNewQuestion = (values: z.infer<typeof questionSchema>) => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: values.text,
      options: [values.option1, values.option2, values.option3],
      correctAnswer: parseInt(values.correctAnswer) - 1,
    };

    setQuestions([...questions, newQuestion]);
    setIsNewQuestionDialogOpen(false);
    form.reset();
    
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

      {/* New Question Dialog */}
      <Dialog open={isNewQuestionDialogOpen} onOpenChange={setIsNewQuestionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة سؤال جديد</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitNewQuestion)} className="space-y-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نص السؤال</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل نص السؤال" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="option1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الخيار الأول</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الخيار الأول" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="option2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الخيار الثاني</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الخيار الثاني" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="option3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الخيار الثالث</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الخيار الثالث" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correctAnswer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>الإجابة الصحيحة</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="1" id="option1" />
                          <Label htmlFor="option1">الخيار الأول</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="2" id="option2" />
                          <Label htmlFor="option2">الخيار الثاني</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="3" id="option3" />
                          <Label htmlFor="option3">الخيار الثالث</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">حفظ</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
