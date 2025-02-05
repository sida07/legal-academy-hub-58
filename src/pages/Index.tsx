import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CourseSection from "@/components/courses/CourseSection";
import Stats from "@/components/Stats";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <CourseSection />
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