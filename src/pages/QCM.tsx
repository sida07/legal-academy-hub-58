import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, BookOpen, Calendar, Trophy, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QCM = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    totalExams: 45,
    passedExams: 32,
    successRate: 71,
  };

  const subjects = [
    { id: 1, name: "القانون المدني", icon: BookOpen },
    { id: 2, name: "القانون الجنائي", icon: GraduationCap },
    { id: 3, name: "القانون التجاري", icon: BarChart3 },
  ];

  const years = [
    { id: 1, year: "2024", exams: 8 },
    { id: 2, year: "2023", exams: 12 },
    { id: 3, year: "2022", exams: 10 },
    { id: 4, year: "2021", exams: 15 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-right">اختبارات القانون</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن اختبار..."
              className="pl-10 text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Card className="w-full md:w-48">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">نسبة النجاح</p>
                  <p className="text-2xl font-bold">{stats.successRate}%</p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-48">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">الاختبارات المجتازة</p>
                  <p className="text-2xl font-bold">{stats.passedExams}/{stats.totalExams}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="lawyer" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="lawyer" className="flex-1">اختبارات مناظرة المحاماة</TabsTrigger>
          <TabsTrigger value="other" className="flex-1">اختبارات مناظرات أخرى</TabsTrigger>
        </TabsList>

        <TabsContent value="lawyer" className="space-y-6">
          {/* Previous Exams Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Calendar className="h-5 w-5" />
                <span>اختبارات سابقة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {years.map((year) => (
                  <Card key={year.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">{year.year}</h3>
                        <p className="text-sm text-muted-foreground">
                          {year.exams} اختبارات متوفرة
                        </p>
                        <Button className="mt-4 w-full">عرض الاختبارات</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subjects Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <BookOpen className="h-5 w-5" />
                <span>اختبارات حسب المادة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => {
                  const Icon = subject.icon;
                  return (
                    <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 justify-end">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
                            <Progress value={75} className="w-32" />
                          </div>
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <Button className="mt-4 w-full">بدء الاختبار</Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Challenge Section */}
          <Card className="bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-right">
                  <h3 className="text-xl font-bold mb-2">تحدي نفسك! 🏆</h3>
                  <p className="text-muted-foreground">جرب اختبار عشوائي من السنوات السابقة</p>
                </div>
                <Button size="lg" className="w-full md:w-auto">
                  <Trophy className="mr-2 h-5 w-5" />
                  ابدأ التحدي
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">اختبارات مناظرات أخرى</h3>
                <p className="text-muted-foreground mb-4">قريباً...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCM;