import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Book, FileText, Users, Star, Clock, Trophy } from "lucide-react";
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
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-gray-600 mb-6">{courseData.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{courseData.students} طالب</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>{courseData.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{courseData.duration}</span>
                </div>
              </div>

              <Tabs defaultValue="content" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="content">محتوى الدورة</TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                  <TabsTrigger value="instructor">المدرب</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <div className="space-y-4">
                    {courseData.lessons.map((lesson, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {lesson.type === "video" && <Play className="w-5 h-5 text-blue-500" />}
                            {lesson.type === "pdf" && <FileText className="w-5 h-5 text-red-500" />}
                            {lesson.type === "quiz" && <Trophy className="w-5 h-5 text-yellow-500" />}
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-gray-500 text-sm">{lesson.duration}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="text-center py-8 text-gray-500">
                    قريباً - تقييمات الطلاب
                  </div>
                </TabsContent>
                
                <TabsContent value="instructor">
                  <div className="text-center py-8 text-gray-500">
                    قريباً - معلومات المدرب
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-2xl font-bold mb-4">{courseData.price}</div>
              <Button className="w-full mb-4">سجل الآن</Button>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-gray-500" />
                  <span>{courseData.lessons.length} دروس</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-gray-500" />
                  <span>شهادة إتمام</span>
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