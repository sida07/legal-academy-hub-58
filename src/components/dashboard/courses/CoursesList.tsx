import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Edit, Trash2, Users, Video, FileText } from "lucide-react";

interface Course {
  id: number;
  title: string;
  instructor: string;
  students: number;
  duration: string;
  status: "active" | "draft" | "archived";
  progress: number;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "مناظرة المحاماة",
    instructor: "د. أحمد محمد",
    students: 584,
    duration: "3 أشهر",
    status: "active",
    progress: 75,
  },
  {
    id: 2,
    title: "القانون الجنائي",
    instructor: "د. سارة علي",
    students: 423,
    duration: "2 أشهر",
    status: "active",
    progress: 60,
  },
];

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذه الدورة؟");
    
    if (confirmDelete) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
      toast({
        title: "تم حذف الدورة",
        description: "تم حذف الدورة بنجاح",
      });
    }
  };

  const filteredCourses = courses.filter(
    course => course.title.includes(search)
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          type="search"
          placeholder="🔍 بحث في الدورات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان الدورة</TableHead>
            <TableHead>المدرس</TableHead>
            <TableHead>عدد الطلاب</TableHead>
            <TableHead>المدة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>{course.students}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm ${
                  course.status === "active" 
                    ? "bg-green-100 text-green-800"
                    : course.status === "draft"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {course.status === "active" ? "نشط" : course.status === "draft" ? "مسودة" : "مؤرشف"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <Link to={`${course.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <Link to={`${course.id}/content`}>
                      <Video className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <Link to={`${course.id}/materials`}>
                      <FileText className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <Link to={`${course.id}/students`}>
                      <Users className="h-4 w-4" />
                    </Link>
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

export default CoursesList;