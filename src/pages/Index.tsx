import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CourseSection from "@/components/courses/CourseSection";
import Stats from "@/components/Stats";
import Map from "@/components/Map";
import AdvancedSearch from "@/components/search/AdvancedSearch";

const Index = () => {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <Hero />
      <AdvancedSearch />
      <CourseSection />
      <Stats />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">موقعنا</h2>
        <Map />
      </div>
    </div>
  );
};

export default Index;