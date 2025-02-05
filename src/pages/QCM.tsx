import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, BookOpen, Calendar, Trophy, BarChart3, Clock, Users, CheckCircle } from "lucide-react";
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
    { id: 1, name: "القانون المدني", icon: BookOpen, progress: 75 },
    { id: 2, name: "القانون الجنائي", icon: GraduationCap, progress: 60 },
    { id: 3, name: "القانون التجاري", icon: BarChart3, progress: 45 },
  ];

  const years = [
    { id: 1, year: "2024", exams: 8, users: 120, avgScore: 85 },
    { id: 2, year: "2023", exams: 12, users: 250, avgScore: 78 },
    { id: 3, year: "2022", exams: 10, users: 180, avgScore: 82 },
    { id: 4, year: "2021", exams: 15, users: 300, avgScore: 75 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
              اختبارات القانون
            </h1>
            <div className="flex gap-4 w-full md:w-auto">
              <Card className="flex-1 md:w-48 bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">نسبة النجاح</p>
                      <p className="text-2xl font-bold text-green-500">{stats.successRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex-1 md:w-48 bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 justify-center">
                    <Trophy className="h-5 w-5 text-primary" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">الاختبارات المجتازة</p>
                      <p className="text-2xl font-bold text-primary">{stats.passedExams}/{stats.totalExams}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="relative w-full md:w-96 mx-auto">
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن اختبار..."
              className="pl-10 text-right bg-white/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="lawyer" className="space-y-6">
          <TabsList className="w-full justify-start bg-white/50 backdrop-blur-sm border border-primary/10">
            <TabsTrigger value="lawyer" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              اختبارات مناظرة المحاماة
            </TabsTrigger>
            <TabsTrigger value="other" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              اختبارات مناظرات أخرى
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lawyer" className="space-y-6 animate-fade-in">
            {/* Previous Exams Section */}
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-right">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span>اختبارات سابقة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {years.map((year) => (
                    <Card key={year.id} className="bg-white border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <h3 className="text-2xl font-bold text-primary">{year.year}</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                {year.exams} اختبارات متوفرة
                              </p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                {year.users} مستخدم
                              </p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <Trophy className="h-4 w-4 text-green-500" />
                              <p className="text-sm text-green-500">
                                معدل النجاح {year.avgScore}%
                              </p>
                            </div>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary-dark transition-colors">
                            عرض الاختبارات
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects Section */}
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-right">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span>اختبارات حسب المادة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <Card key={subject.id} className="bg-white border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4 justify-end">
                              <div className="text-right">
                                <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
                                <Progress value={subject.progress} className="w-32 bg-primary/20" />
                              </div>
                              <div className="p-3 rounded-full bg-primary/5">
                                <Icon className="h-8 w-8 text-primary" />
                              </div>
                            </div>
                            <Button className="w-full bg-primary hover:bg-primary-dark transition-colors">
                              بدء الاختبار
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Challenge Section */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 hover:border-primary/30 transition-colors">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-right">
                    <h3 className="text-2xl font-bold mb-2">تحدي نفسك! 🏆</h3>
                    <p className="text-muted-foreground">جرب اختبار عشوائي من السنوات السابقة</p>
                  </div>
                  <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary-dark transition-colors group">
                    <Trophy className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    ابدأ التحدي
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="animate-fade-in">
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold mb-2">اختبارات مناظرات أخرى</h3>
                  <p className="text-muted-foreground mb-4">قريباً...</p>
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/5 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QCM;