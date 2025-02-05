
import { useState } from "react";
import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ListCheck, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Exam {
  id: number;
  title: string;
  subject: string;
  totalQuestions: number;
  timeLimit: number;
  createdAt: string;
}

const mockExams: Exam[] = [
  {
    id: 1,
    title: "اختبار القانون المدني",
    subject: "القانون المدني",
    totalQuestions: 30,
    timeLimit: 60,
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    title: "اختبار القانون الجنائي",
    subject: "القانون الجنائي",
    totalQuestions: 25,
    timeLimit: 45,
    createdAt: "2024-01-15",
  },
];

const ExamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: id ? "تم تحديث الاختبار" : "تم إضافة الاختبار",
      description: id ? "تم تحديث الاختبار بنجاح" : "تم إضافة الاختبار بنجاح",
    });
    navigate("/dashboard/exams");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "تعديل الاختبار" : "إضافة اختبار جديد"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">عنوان الاختبار</label>
          <Input placeholder="أدخل عنوان الاختبار" />
        </div>
        <Button type="submit">
          {id ? "تحديث الاختبار" : "إضافة الاختبار"}
        </Button>
      </form>
    </div>
  );
};

const ExamsList = () => {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الاختبار؟");
    
    if (confirmDelete) {
      setExams(prevExams => prevExams.filter(exam => exam.id !== id));
      
      toast({
        title: "تم حذف الاختبار بنجاح",
        description: "تم حذف الاختبار من النظام",
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ListCheck className="h-6 w-6" /> إدارة الاختبارات
      </h1>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="🔍 بحث عن الاختبارات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Button asChild>
          <Link to="new">
            <Plus className="h-4 w-4 ml-2" />
            إضافة اختبار
          </Link>
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>عنوان الاختبار</TableCell>
            <TableCell>المادة</TableCell>
            <TableCell>عدد الأسئلة</TableCell>
            <TableCell>المدة (دقيقة)</TableCell>
            <TableCell>تاريخ الإنشاء</TableCell>
            <TableCell>إجراءات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exams
            .filter(
              (exam) =>
                exam.title.includes(search) || exam.subject.includes(search)
            )
            .map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.subject}</TableCell>
                <TableCell>{exam.totalQuestions}</TableCell>
                <TableCell>{exam.timeLimit}</TableCell>
                <TableCell>{exam.createdAt}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <Link to={`${exam.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(exam.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Exams = () => {
  return (
    <Routes>
      <Route index element={<ExamsList />} />
      <Route path="new" element={<ExamForm />} />
      <Route path=":id/edit" element={<ExamForm />} />
    </Routes>
  );
};

export default Exams;
