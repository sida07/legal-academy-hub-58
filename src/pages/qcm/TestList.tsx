import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Clock, Gauge } from "lucide-react";
import { QCMCategory } from "@/types/qcm";

interface YearlyTest {
  id: number;
  year: string;
  questionsCount: number;
  duration: number;
  difficulty: "سهل" | "متوسط" | "صعب";
}

// Generate tests for years 2000-2024
const generateTests = () => {
  const tests: YearlyTest[] = [];
  const difficulties = ["سهل", "متوسط", "صعب"] as const;

  for (let year = 2024; year >= 2000; year--) {
    tests.push({
      id: 2024 - year + 1,
      year: year.toString(),
      questionsCount: 50,
      duration: 60,
      difficulty: difficulties[Math.floor(Math.random() * 3)],
    });
  }
  return tests;
};

const mockTests = generateTests();

interface TestListProps {
  category: QCMCategory;
}

const TestList = ({ category }: TestListProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<"lawyer" | "other">("lawyer");

  const filteredTests = mockTests.filter(
    test => test.year.includes(searchTerm) && 
    (category === "all" || test.category === category)
  );

  const handleStartTest = (year: string) => {
    navigate("/mcq-test", { 
      state: { 
        testYear: year,
        testName: `اختبار سنة ${year}`
      }
    });
  };

  const getDifficultyColor = (difficulty: YearlyTest["difficulty"]) => {
    switch (difficulty) {
      case "سهل":
        return "text-green-600";
      case "متوسط":
        return "text-yellow-600";
      case "صعب":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">الاختبارات المتوفرة</h1>
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث حسب السنة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>
        </div>

        <Tabs defaultValue="lawyer" onValueChange={(value) => setCurrentTab(value as "lawyer" | "other")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lawyer">مناظرات المحاماة</TabsTrigger>
            <TabsTrigger value="other">مناظرات أخرى</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lawyer" className="mt-6">
            <div className="grid gap-4">
              {filteredTests.map((test) => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        اختبار سنة {test.year}
                      </span>
                      <Button onClick={() => handleStartTest(test.year)}>
                        ابدأ الاختبار
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{test.duration} دقيقة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{test.questionsCount} سؤال</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="other">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                لا توجد اختبارات متوفرة حالياً في هذا القسم
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestList;
