import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Plus, FileText, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseContent = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "مقدمة في القانون",
      lessons: [
        { id: 1, title: "تعريف القانون", duration: "15:00", type: "video" },
        { id: 2, title: "مصادر القانون", duration: "20:00", type: "video" },
      ],
    },
  ]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        title: "قسم جديد",
        lessons: [],
      },
    ]);
    toast({
      title: "تم إضافة القسم",
      description: "تم إضافة قسم جديد بنجاح",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">محتوى الدورة</h1>
        <Button onClick={handleAddSection}>
          <Plus className="ml-2" />
          إضافة قسم جديد
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Input
                value={section.title}
                onChange={(e) => {
                  const newSections = sections.map((s) =>
                    s.id === section.id
                      ? { ...s, title: e.target.value }
                      : s
                  );
                  setSections(newSections);
                }}
                className="w-1/3"
              />
              <Button variant="outline" onClick={() => {
                const newSections = sections.filter((s) => s.id !== section.id);
                setSections(newSections);
                toast({
                  title: "تم حذف القسم",
                  description: "تم حذف القسم بنجاح",
                });
              }}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div className="space-y-2">
              {section.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    {lesson.type === "video" ? (
                      <Video className="h-4 w-4 text-primary" />
                    ) : (
                      <FileText className="h-4 w-4 text-primary" />
                    )}
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Plus className="ml-2 h-4 w-4" />
                إضافة فيديو
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="ml-2 h-4 w-4" />
                إضافة ملف
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;