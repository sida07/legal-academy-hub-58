import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  MessageSquare, 
  Trophy,
  Pencil
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock data - replace with real data later
  const userStats = {
    posts: 15,
    points: 250
  };

  const courses = [
    {
      id: 1,
      name: "القانون المدني",
      progress: 75,
      lastLesson: "العقود التجارية"
    },
    {
      id: 2,
      name: "القانون الجنائي",
      progress: 45,
      lastLesson: "الجرائم الإلكترونية"
    }
  ];

  const examResults = [
    {
      id: 1,
      name: "اختبار القانون المدني",
      score: 85,
      date: "2024-02-01",
      total: 100
    },
    {
      id: 2,
      name: "اختبار القانون الجنائي",
      score: 92,
      date: "2024-01-25",
      total: 100
    }
  ];

  const forumActivity = [
    {
      id: 1,
      title: "سؤال عن العقود الإلكترونية",
      likes: 12,
      replies: 5
    },
    {
      id: 2,
      title: "استفسار قانوني",
      likes: 8,
      replies: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 relative transition-transform group-hover:scale-105 duration-300">
                <AvatarImage src="https://github.com/shadcn.png" className="object-cover" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="text-right">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  أحمد محمد السيد
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  طالب قانون - الجامعة العربية
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4 justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{userStats.posts}</span>
                    <span>مشاركة</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <span className="font-semibold">🏆 {userStats.points}</span>
                    <span>نقطة</span>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline"
                    className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50"
                    onClick={() => navigate('/profile-settings')}
                  >
                    <span className="relative flex items-center gap-2 z-10">
                      <Pencil className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      تعديل الملف الشخصي
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="courses" className="space-y-8" dir="rtl">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 shadow-lg animate-slide-up">
            <TabsList className="grid grid-cols-3 h-auto gap-2">
              <TabsTrigger 
                value="courses"
                className="data-[state=active]:bg-primary data-[state=active]:text-white gap-2 py-3"
              >
                <BookOpen className="h-4 w-4" />
                الدورات المسجلة
              </TabsTrigger>
              <TabsTrigger 
                value="exams"
                className="data-[state=active]:bg-primary data-[state=active]:text-white gap-2 py-3"
              >
                <Trophy className="h-4 w-4" />
                نتائج الاختبارات
              </TabsTrigger>
              <TabsTrigger 
                value="forum"
                className="data-[state=active]:bg-primary data-[state=active]:text-white gap-2 py-3"
              >
                <MessageSquare className="h-4 w-4" />
                نشاط المنتدى
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="courses" className="animate-fade-in">
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-right">{course.name}</h3>
                  <div className="space-y-4">
                    <Progress value={course.progress} className="w-full" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
                      {course.progress}% مكتمل
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-right">
                      آخر درس: {course.lastLesson}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exams" className="animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                {examResults.map((exam) => (
                  <div key={exam.id} className="flex justify-between items-center border-b pb-4 last:border-0">
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
          </TabsContent>

          <TabsContent value="forum" className="animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                {forumActivity.map((topic) => (
                  <div key={topic.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{topic.likes} إعجاب</span>
                      <span>{topic.replies} رد</span>
                    </div>
                    <h3 className="font-semibold text-right">{topic.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;