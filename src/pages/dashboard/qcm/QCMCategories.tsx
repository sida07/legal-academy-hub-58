import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Library } from "lucide-react";

const QCMCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "year1",
      title: "اختبارات المحاماة - السنة الأولى",
      description: "اختبارات من سنة 2000 إلى 2045",
      icon: <GraduationCap className="w-8 h-8" />,
      path: "/dashboard/qcm/lawyers/year1",
    },
    {
      id: "year2",
      title: "اختبارات المحاماة - السنة الثانية",
      description: "اختبارات من سنة 2000 إلى 2045",
      icon: <GraduationCap className="w-8 h-8" />,
      path: "/dashboard/qcm/lawyers/year2",
    },
    {
      id: "subjects",
      title: "اختبارات حسب المادة",
      description: "القانون المدني، الجنائي، التجاري وغيرها",
      icon: <BookOpen className="w-8 h-8" />,
      path: "/dashboard/qcm/subjects",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                {category.icon}
                <CardTitle>{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{category.description}</p>
              <Button
                className="w-full"
                onClick={() => navigate(category.path)}
              >
                عرض الاختبارات
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QCMCategories;