import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Search, Clock, Users, Trophy } from "lucide-react";

// Generate tests for years 2000-2024
const generateTests = () => {
  const tests = [];
  for (let year = 2024; year >= 2000; year--) {
    tests.push({
      id: 2024 - year + 1,
      year: year.toString(),
      questionsCount: 50,
      duration: 60,
      users: Math.floor(Math.random() * 200) + 50,
      avgScore: Math.floor(Math.random() * 20) + 70,
    });
  }
  return tests;
};

const mockTests = generateTests();

const FirstYearTestList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTests = mockTests.filter(
    test => test.year.includes(searchTerm)
  );

  const handleStartTest = (year: string) => {
    navigate("/mcq-test", { 
      state: { 
        testYear: year,
        testName: `اختبار سنة ${year}`
      }
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">اختبارات السنة الأولى</h1>
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
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{test.users} مستخدم</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">
                      معدل النجاح {test.avgScore}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstYearTestList;