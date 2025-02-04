
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import Stats from "@/components/Stats";

const courses = [
  {
    title: "دورة المحاماة المدنية",
    description: "دورة شاملة في القانون المدني والإجراءات المدنية",
    image: "/lovable-uploads/13768705-6e8b-4a25-ba8d-54b7eb7ecd3b.png",
    students: 584,
  },
  {
    title: "دورة القانون الجنائي",
    description: "تحضير متكامل للقانون الجنائي وإجراءاته",
    image: "/lovable-uploads/13768705-6e8b-4a25-ba8d-54b7eb7ecd3b.png",
    students: 1665,
  },
  {
    title: "دورة القانون الدستوري",
    description: "دراسة معمقة للقانون الدستوري والحريات العامة",
    image: "/lovable-uploads/13768705-6e8b-4a25-ba8d-54b7eb7ecd3b.png",
    students: 965,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">الدورات المتاحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>

      <Stats />
      
      <footer className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 منصة القانون. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
