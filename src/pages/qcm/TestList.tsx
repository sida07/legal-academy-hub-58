
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Clock, Gauge } from "lucide-react";

interface Test {
  id: number;
  title: string;
  subject: string;
  questionsCount: number;
  duration: number;
  difficulty: "سهل" | "متوسط" | "صعب";
  category: "lawyer" | "other";
  year: string;
}

// Generate tests for years 2000-2024
const generateTests = () => {
  const tests: Test[] = [];
  const subjects = [
    "القانون المدني",
    "القانون الجنائي",
    "القانون الإداري",
    "القانون التجاري",
    "القانون الدستوري"
  ];
  const difficulties = ["سهل", "متوسط", "صعب"] as const;

  for (let year = 2024; year >= 2000; year--) {
    subjects.forEach((subject, index) => {
      tests.push({
        id: (2024 - year) * subjects.length + index + 1,
        title: `اختبار ${subject} - دورة ${year}`,
        subject: subject,
        questionsCount: 50,
        duration: 60,
        difficulty: difficulties[Math.floor(Math.random() * 3)],
        category: "lawyer",
        year: year.toString()
      });
    });
  }
  return tests;
};

const mockTests = generateTests();

const TestList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<"lawyer" | "other">("lawyer");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const years = Array.from(new Set(mockTests.map(test => test.year))).sort((a, b) => Number(b) - Number(a));

  const filteredTests = mockTests.filter(
    test =>
      test.category === currentTab &&
      (selectedYear === "all" || test.year === selectedYear) &&
      (test.title.includes(searchTerm) || test.subject.includes(searchTerm))
  );

  const handleStartTest = (test: Test) => {
    navigate("/mcq-test", { state: { subjectName: test.title } });
  };

  const getDifficultyColor = (difficulty: Test["difficulty"]) => {
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
          <div className="flex gap-4 w-full md:w-auto">
            <select
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">كل السنوات</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  سنة {year}
                </option>
              ))}
            </select>
            <div className="relative w-64">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث في الاختبارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-9"
              />
            </div>
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
                        {test.title}
                      </span>
                      <Button onClick={() => handleStartTest(test)}>
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
