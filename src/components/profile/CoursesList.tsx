import { Progress } from "@/components/ui/progress";

interface Course {
  id: number;
  name: string;
  progress: number;
  lastAccessed: string;
}

interface CoursesListProps {
  courses: Course[];
}

export const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5DEFF] hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 text-right text-[#6E59A5]">{course.name}</h3>
          <div className="space-y-4">
            <Progress 
              value={course.progress} 
              className="h-2 bg-[#F1F0FB] [&>[role=progressbar]]:bg-[#8B5CF6]"
            />
            <p className="text-sm text-[#7E69AB] text-right">
              {course.progress}% مكتمل
            </p>
            <p className="text-xs text-[#7E69AB] text-right">
              آخر نشاط: {new Date(course.lastAccessed).toLocaleDateString('ar-MA')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};