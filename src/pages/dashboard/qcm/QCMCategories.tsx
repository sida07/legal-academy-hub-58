import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, BarChart, Eye, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Test {
  id: string;
  title: string;
  category: string;
  questionsCount: number;
  participants: number;
  successRate: number;
}

const mockTests: Test[] = [
  {
    id: "1",
    title: "اختبار سنة 2024",
    category: "first-year",
    questionsCount: 50,
    participants: 120,
    successRate: 75,
  },
  {
    id: "2",
    title: "اختبار سنة 2023",
    category: "second-year",
    questionsCount: 50,
    participants: 200,
    successRate: 68,
  },
];

const QCMCategories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewQuestions = (testId: string) => {
    navigate(`/dashboard/qcm/exam/${testId}`);
  };

  const handleEditTest = (testId: string) => {
    toast({
      title: "تعديل الاختبار",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const handleDeleteTest = (testId: string) => {
    toast({
      title: "حذف الاختبار",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const categories = [
    {
      id: "first-year",
      title: "اختبارات المحاماة - السنة الأولى",
      tests: mockTests.filter((test) => test.category === "first-year"),
    },
    {
      id: "second-year",
      title: "اختبارات المحاماة - السنة الثانية",
      tests: mockTests.filter((test) => test.category === "second-year"),
    },
    {
      id: "other",
      title: "اختبارات أخرى",
      tests: mockTests.filter((test) => test.category === "other"),
    },
  ];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {category.tests.map((test) => (
                <Card key={test.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{test.title}</h3>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            {test.questionsCount} سؤال
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {test.participants} مشارك
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart className="w-4 h-4" />
                            نسبة النجاح {test.successRate}%
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleViewQuestions(test.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          عرض الأسئلة
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditTest(test.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteTest(test.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {category.tests.length === 0 && (
                <div className="text-center p-6 text-muted-foreground">
                  لا توجد اختبارات في هذه الفئة
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QCMCategories;