import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, UserPlus, Download } from "lucide-react";

interface Student {
  id: number;
  name: string;
  email: string;
  progress: number;
  joinedAt: string;
  status: "active" | "inactive";
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    progress: 75,
    joinedAt: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "سارة علي",
    email: "sara@example.com",
    progress: 45,
    joinedAt: "2024-01-20",
    status: "active",
  },
];

const CourseStudents = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.includes(search) || student.email.includes(search)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">الطلاب المسجلين</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير البيانات
          </Button>
          <Button>
            <UserPlus className="ml-2 h-4 w-4" />
            إضافة طالب
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="بحث عن طالب..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>اسم الطالب</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>نسبة التقدم</TableHead>
            <TableHead>تاريخ الانضمام</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 mt-1">
                  {student.progress}%
                </span>
              </TableCell>
              <TableCell>{student.joinedAt}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    student.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {student.status === "active" ? "نشط" : "غير نشط"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseStudents;