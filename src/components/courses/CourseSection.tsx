import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const courses = [
  {
    title: "مناظرة المحاماة",
    description: "دورة شاملة للتحضير لمناظرة المحاماة مع تدريبات عملية",
    image: "/lovable-uploads/1b2ef1f5-1eee-44d5-b21e-19e7a8c67dba.png",
    students: 584,
    level: "متقدم",
    duration: "3 أشهر",
    instructor: "د. أحمد محمد",
    rating: 4.8,
  },
  {
    title: "القانون الجنائي",
    description: "دورة متخصصة في القانون الجنائي وإجراءاته",
    image: "/lovable-uploads/1b2ef1f5-1eee-44d5-b21e-19e7a8c67dba.png",
    students: 423,
    level: "متوسط",
    duration: "2 أشهر",
    instructor: "د. سارة علي",
    rating: 4.6,
  },
  {
    title: "مناظرة القضاء",
    description: "برنامج تدريبي شامل للتحضير لمناظرة القضاء",
    image: "/lovable-uploads/1b2ef1f5-1eee-44d5-b21e-19e7a8c67dba.png",
    students: 312,
    level: "متقدم",
    duration: "4 أشهر",
    instructor: "د. محمد خالد",
    rating: 4.9,
  }
];

const CourseSection = () => {
  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">الدورات المتاحة</h2>
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="ابحث عن دورة..."
              className="pl-10 pr-4"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="mx-auto">
            عرض المزيد من الدورات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;