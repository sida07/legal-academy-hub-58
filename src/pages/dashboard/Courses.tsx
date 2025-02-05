import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import CourseForm from "@/components/dashboard/courses/CourseForm";
import CoursesList from "@/components/dashboard/courses/CoursesList";
import CourseStats from "@/components/dashboard/courses/CourseStats";
import CourseContent from "@/components/dashboard/courses/CourseContent";
import CourseStudents from "@/components/dashboard/courses/CourseStudents";
import CourseMaterials from "@/components/dashboard/courses/CourseMaterials";

const Courses = () => {
  return (
    <Routes>
      <Route index element={<CoursesPage />} />
      <Route path="new" element={<CourseForm />} />
      <Route path=":id/edit" element={<CourseForm />} />
      <Route path=":id/content" element={<CourseContent />} />
      <Route path=":id/materials" element={<CourseMaterials />} />
      <Route path=":id/students" element={<CourseStudents />} />
    </Routes>
  );
};

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة الدورات</h1>
        <Button asChild>
          <Link to="new">إضافة دورة جديدة</Link>
        </Button>
      </div>

      <Tabs defaultValue="list" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">قائمة الدورات</TabsTrigger>
          <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <CoursesList />
        </TabsContent>
        
        <TabsContent value="stats">
          <CourseStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;