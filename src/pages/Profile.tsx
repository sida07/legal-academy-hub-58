import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BookOpen, Calendar } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { CoursesList } from "@/components/profile/CoursesList";
import { CertificatesList } from "@/components/profile/CertificatesList";
import { NotificationsList } from "@/components/profile/NotificationsList";

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
        <ProfileHeader userProfile={userProfile} />

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

          <TabsContent value="courses">
            <CoursesList courses={enrolledCourses} />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificatesList certificates={certificates} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsList notifications={notifications} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;