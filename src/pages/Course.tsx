import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Book, FileText, Users, Star, Clock, Trophy, CheckCircle, BookOpen, Target, BarChart } from "lucide-react";
import Navbar from "@/components/Navbar";

const Course = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("content");

  const courseData = {
    title: "مناظرة المحاماة",
    description: "دورة شاملة للتحضير لمناظرة المحاماة مع تدريبات عملية",
    instructor: "د. أحمد محمد",
    duration: "3 أشهر",
    students: 584,
    rating: 4.8,
    price: "999 دينار",
    lessons: [
      {
        title: "مقدمة في القانون المدني",
        duration: "45 دقيقة",
        type: "video"
      },
      {
        title: "العقود والالتزامات",
        duration: "60 دقيقة",
        type: "pdf"
      },
      {
        title: "قانون الأسرة",
        duration: "30 دقيقة",
        type: "quiz"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 mb-6 animate-fade-in">
              <h1 className="text-4xl font-bold mb-4 text-primary">{courseData.title}</h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{courseData.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg animate-slide-up">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">{courseData.students} طالب</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-yellow-700 font-medium">{courseData.rating}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">{courseData.duration}</span>
                </div>
              </div>

              <Tabs defaultValue="content" className="w-full">
                <TabsList className="w-full justify-start mb-6 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="content" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                    <BookOpen className="w-4 h-4 ml-2" />
                    محتوى الدورة
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                    <Star className="w-4 h-4 ml-2" />
                    التقييمات
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                    <Users className="w-4 h-4 ml-2" />
                    المدرب
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <div className="space-y-4">
                    {courseData.lessons.map((lesson, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {lesson.type === "video" && <Play className="w-6 h-6 text-blue-500" />}
                            {lesson.type === "pdf" && <FileText className="w-6 h-6 text-red-500" />}
                            {lesson.type === "quiz" && <Trophy className="w-6 h-6 text-yellow-500" />}
                            <div>
                              <h3 className="font-semibold text-lg">{lesson.title}</h3>
                              <span className="text-gray-500 text-sm flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" className="hover:bg-primary/10">
                            <Play className="w-5 h-5" />
                            ابدأ الدرس
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="text-center py-12 text-gray-500">
                    <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                    قريباً - تقييمات الطلاب
                  </div>
                </TabsContent>
                
                <TabsContent value="instructor">
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                    قريباً - معلومات المدرب
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-8 sticky top-24 animate-fade-in border-2 hover:border-primary/20 transition-all duration-300">
              <div className="text-3xl font-bold mb-6 text-primary">{courseData.price}</div>
              <Button size="lg" className="w-full mb-6 text-lg gap-2 hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5" />
                سجل الآن
              </Button>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Book className="w-6 h-6 text-primary" />
                  <div>
                    <span className="font-medium">عدد الدروس</span>
                    <p className="text-gray-600">{courseData.lessons.length} دروس</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <span className="font-medium">المدة</span>
                    <p className="text-gray-600">{courseData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Trophy className="w-6 h-6 text-primary" />
                  <div>
                    <span className="font-medium">شهادة إتمام</span>
                    <p className="text-gray-600">عند إكمال الدورة</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;