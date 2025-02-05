import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: id ? "تم تحديث الدورة" : "تم إضافة الدورة",
      description: id ? "تم تحديث الدورة بنجاح" : "تم إضافة الدورة بنجاح",
    });
    navigate("/dashboard/courses");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "تعديل الدورة" : "إضافة دورة جديدة"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">عنوان الدورة</label>
          <Input placeholder="أدخل عنوان الدورة" />
        </div>
        <Button type="submit">
          {id ? "تحديث الدورة" : "إضافة الدورة"}
        </Button>
      </form>
    </div>
  );
};

const CoursesList = () => {
  const { toast } = useToast();

  const courses = [
    {
      id: 1,
      title: "مناظرة المحاماة",
      instructor: "د. أحمد محمد",
      students: 584,
      status: "نشط",
    },
    {
      id: 2,
      title: "القانون الجنائي",
      instructor: "د. سارة علي",
      students: 423,
      status: "نشط",
    },
  ];

  const handleDelete = (id: number) => {
    toast({
      title: "تم حذف الدورة",
      description: "تم حذف الدورة بنجاح",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الدورات</h1>
        <Button>إضافة دورة جديدة</Button>
      </div>

      <div className="relative w-64 mb-6">
        <Input placeholder="البحث عن دورة..." className="pl-10" />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان الدورة</TableHead>
            <TableHead>المدرس</TableHead>
            <TableHead>عدد الطلاب</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>{course.students}</TableCell>
              <TableCell>{course.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                  >
                    حذف
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Courses = () => {
  return (
    <Routes>
      <Route index element={<CoursesList />} />
      <Route path="new" element={<CourseForm />} />
      <Route path=":id/edit" element={<CourseForm />} />
    </Routes>
  );
};

export default Courses;
