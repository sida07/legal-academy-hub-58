
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const userStats = {
    posts: 158,
    points: 1250,
  };

  const courses = [
    {
      id: 1,
      name: "القانون المدني",
      progress: 70,
      lastLesson: "المراجعات المدنية القضائية",
    },
    {
      id: 2,
      name: "القانون الجنائي",
      progress: 45,
      lastLesson: "المراجعات الجنائية الأساسية",
    },
  ];

  const examResults = [
    {
      id: 1,
      name: "اختبار القانون المدني",
      score: 90,
      date: "مارس 15, 2025",
      total: 45,
    },
    {
      id: 2,
      name: "اختبار القانون الجنائي",
      score: 75,
      date: "مارس 10, 2025",
      total: 60,
    },
  ];

  const forumActivity = [
    {
      id: 1,
      title: "مناقشة حول حقوق الملكية",
      replies: 15,
      likes: 23,
    },
    {
      id: 2,
      title: "سؤال عن اجراءات التقاضي",
      replies: 8,
      likes: 12,
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-right">
            <h1 className="text-2xl font-bold mb-2">أحمد محمد السيد</h1>
            <p className="text-gray-600 mb-1">طالب قانون - الجامعة العربية</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>{userStats.posts} مشاركة</span>
              <span className="text-primary">🏆 {userStats.points} نقطة</span>
            </div>
            <Button variant="outline">تعديل الملف الشخصي</Button>
          </div>
        </div>
      </div>

      {/* Courses Progress */}
      <h2 className="text-xl font-semibold mb-4 text-right">الدورات المسجلة</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="text-right">{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={course.progress} className="w-full" />
                <p className="text-sm text-gray-500 text-right">
                  {course.progress}% مكتمل
                </p>
                <p className="text-sm text-gray-600 text-right">
                  آخر درس: {course.lastLesson}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exam Results */}
      <h2 className="text-xl font-semibold mb-4 text-right">نتائج الاختبارات</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="space-y-6">
          {examResults.map((exam) => (
            <div
              key={exam.id}
              className="flex justify-between items-center border-b pb-4 last:border-0"
            >
              <div className="text-primary font-semibold">
                {exam.score}% النتيجة
              </div>
              <div className="text-right">
                <h3 className="font-semibold mb-1">{exam.name}</h3>
                <p className="text-sm text-gray-500">{exam.date}</p>
                <p className="text-sm text-gray-500">
                  الدرجة الكلية: {exam.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forum Activity */}
      <h2 className="text-xl font-semibold mb-4 text-right">نشاط المنتدى</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {forumActivity.map((topic) => (
            <div
              key={topic.id}
              className="flex justify-between items-center border-b pb-4 last:border-0"
            >
              <div className="flex gap-4 text-sm text-gray-500">
                <span>{topic.likes} إعجاب</span>
                <span>{topic.replies} رد</span>
              </div>
              <h3 className="font-semibold text-right">{topic.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
