import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BookOpen, Calendar, Mail, MapPin, Phone, User } from "lucide-react";

const Profile = () => {
  const userProfile = {
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+212 6XX-XXXXXX",
    location: "الرباط، المغرب",
    avatar: "/lovable-uploads/b02377b1-a3f0-4568-b9b2-f7de3f450e14.png",
    bio: "طالب في كلية الحقوق، متخصص في القانون التجاري",
    joinDate: "يناير 2024",
  };

  const enrolledCourses = [
    {
      id: 1,
      name: "مدخل إلى القانون التجاري",
      progress: 75,
      lastAccessed: "2024-01-15",
    },
    {
      id: 2,
      name: "قانون الشركات",
      progress: 45,
      lastAccessed: "2024-01-10",
    },
    {
      id: 3,
      name: "القانون الدولي",
      progress: 90,
      lastAccessed: "2024-01-05",
    },
  ];

  const certificates = [
    {
      id: 1,
      name: "شهادة إتمام دورة القانون التجاري",
      date: "2023-12-15",
      issuer: "أكاديمية القانون",
    },
    {
      id: 2,
      name: "شهادة حضور ندوة القانون الدولي",
      date: "2023-11-20",
      issuer: "المعهد العالي للقانون",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "موعد الامتحان القادم",
      message: "تذكير: امتحان القانون التجاري غداً",
      date: "2024-01-16",
      type: "reminder",
    },
    {
      id: 2,
      title: "تحديث المحتوى",
      message: "تم إضافة محتوى جديد لدورة قانون الشركات",
      date: "2024-01-14",
      type: "update",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7FF] to-[#E5DEFF] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur border-[#D6BCFA]">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-[#8B5CF6]">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>
                  <User className="w-12 h-12 text-[#6E59A5]" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-[#1A1F2C]">{userProfile.name}</h1>
                    <p className="text-[#7E69AB]">{userProfile.bio}</p>
                  </div>
                  <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                    تعديل الملف الشخصي
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-[#6E59A5]">
                    <Mail className="w-4 h-4" />
                    {userProfile.email}
                  </div>
                  <div className="flex items-center gap-2 text-[#6E59A5]">
                    <Phone className="w-4 h-4" />
                    {userProfile.phone}
                  </div>
                  <div className="flex items-center gap-2 text-[#6E59A5]">
                    <MapPin className="w-4 h-4" />
                    {userProfile.location}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur border border-[#D6BCFA]">
            <TabsTrigger value="courses" className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 ml-2" />
              الدورات
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white">
              <Calendar className="w-4 h-4 ml-2" />
              الشهادات
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white">
              <Bell className="w-4 h-4 ml-2" />
              الإشعارات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5DEFF] hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-right text-[#6E59A5]">{course.name}</h3>
                <div className="space-y-4">
                  <Progress value={course.progress} className="h-2 bg-[#F1F0FB] [&>[role=progressbar]]:bg-[#8B5CF6]" />
                  <p className="text-sm text-[#7E69AB] text-right">
                    {course.progress}% مكتمل
                  </p>
                  <p className="text-xs text-[#7E69AB] text-right">
                    آخر نشاط: {new Date(course.lastAccessed).toLocaleDateString('ar-MA')}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5DEFF] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start">
                  <Badge className="bg-[#8B5CF6]">{cert.issuer}</Badge>
                  <p className="text-sm text-[#7E69AB]">
                    {new Date(cert.date).toLocaleDateString('ar-MA')}
                  </p>
                </div>
                <h3 className="text-xl font-semibold mt-4 text-right text-[#6E59A5]">{cert.name}</h3>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5DEFF] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start">
                  <Badge className="bg-[#8B5CF6]">{notif.type === 'reminder' ? 'تذكير' : 'تحديث'}</Badge>
                  <p className="text-sm text-[#7E69AB]">
                    {new Date(notif.date).toLocaleDateString('ar-MA')}
                  </p>
                </div>
                <h3 className="text-lg font-semibold mt-4 text-right text-[#6E59A5]">{notif.title}</h3>
                <p className="text-sm text-[#7E69AB] mt-2 text-right">{notif.message}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;