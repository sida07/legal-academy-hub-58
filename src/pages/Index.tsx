import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CourseSection from "@/components/courses/CourseSection";
import Stats from "@/components/Stats";

const Index = () => {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <Hero />
      <CourseSection />
      <Stats />
    </div>
  );
};

export default Index;