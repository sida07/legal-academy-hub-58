
import { useState } from "react";
import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ListCheck,
  Edit,
  Trash2,
  Plus,
  Upload,
  Download,
  BarChart2,
  FileText,
  BookOpen,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Exam {
  id: number;
  title: string;
  subject: string;
  totalQuestions: number;
  timeLimit: number;
  createdAt: string;
  category: string;
  year: string;
  enabled: boolean;
}

const mockExams: Exam[] = [
  {
    id: 1,
    title: "اختبار القانون المدني",
    subject: "القانون المدني",
    totalQuestions: 50,
    timeLimit: 60,
    createdAt: "2024-01-01",
    category: "lawyer",
    year: "2024",
    enabled: true,
  },
  {
    id: 2,
    title: "اختبار القانون الجنائي",
    subject: "القانون الجنائي",
    totalQuestions: 50,
    timeLimit: 60,
    createdAt: "2024-01-15",
    category: "lawyer",
    year: "2023",
    enabled: true,
  },
];

const ExamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    category: "lawyer",
    year: new Date().getFullYear().toString(),
    totalQuestions: 50,
    timeLimit: 60,
  });

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
          <Input
            placeholder="أدخل عنوان الاختبار"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-2">المادة</label>
          <Input
            placeholder="أدخل المادة"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-2">القسم</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="lawyer">مناظرات المحاماة</option>
            <option value="other">مناظرات أخرى</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">السنة</label>
          <Input
            type="number"
            min="2020"
            max="2024"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
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
  const [currentTab, setCurrentTab] = useState("lawyer");

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الاختبار؟");
    
    if (confirmDelete) {
      setExams(prevExams => prevExams.filter(exam => exam.id !== id));
      
      toast({
        title: "تم حذف الاختبار",
        description: "تم حذف الاختبار بنجاح",
      });
    }
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.category === currentTab &&
      (exam.title.includes(search) || exam.subject.includes(search))
  );

  const stats = {
    totalExams: filteredExams.length,
    avgSuccess: 75,
    totalQuestions: filteredExams.reduce((acc, exam) => acc + exam.totalQuestions, 0),
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ListCheck className="h-6 w-6" /> إدارة الاختبارات
          </h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 ml-2" />
              استيراد
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button asChild>
              <Link to="new">
                <Plus className="h-4 w-4 ml-2" />
                إضافة اختبار
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                مجموع الاختبارات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalExams}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                متوسط نسبة النجاح
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{stats.avgSuccess}%</p>
                <Progress value={stats.avgSuccess} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                مجموع الأسئلة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalQuestions}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lawyer" onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lawyer">مناظرات المحاماة</TabsTrigger>
            <TabsTrigger value="other">مناظرات أخرى</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lawyer" className="space-y-4">
            <div className="flex justify-between mb-4">
              <Input
                type="text"
                placeholder="🔍 بحث عن الاختبارات..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-1/3"
              />
            </div>

            <Table>
              <thead>
                <tr>
                  <th>عنوان الاختبار</th>
                  <th>المادة</th>
                  <th>السنة</th>
                  <th>عدد الأسئلة</th>
                  <th>المدة (دقيقة)</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.title}</td>
                    <td>{exam.subject}</td>
                    <td>{exam.year}</td>
                    <td>{exam.totalQuestions}</td>
                    <td>{exam.timeLimit}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-sm ${exam.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {exam.enabled ? 'مفعل' : 'معطل'}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
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
                        <Button
                          variant="outline"
                          size="icon"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabsContent>
          
          <TabsContent value="other">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">لم يتم إضافة أي اختبارات لهذا القسم بعد</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
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
