
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Trophy, BookOpen, GraduationCap, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const QCMList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const years = [
    { id: 1, year: "اختبرات ألسنة الولي", exams: 8, users: 120, avgScore: 85 },
    { id: 2, year: "2023", exams: 12, users: 250, avgScore: 78 }
  ];

  const subjects = [
    { id: 1, name: "القانون المدني", icon: BookOpen, progress: 75 },
    { id: 2, name: "القانون الجنائي", icon: GraduationCap, progress: 60 },
    { id: 3, name: "القانون التجاري", icon: BarChart3, progress: 45 },
  ];

  const handleStartTest = (subjectId: number, subjectName: string) => {
    toast({
      title: "جاري تحميل الاختبار",
      description: `تحضير اختبار ${subjectName}`,
    });
    
    // Navigate to the MCQ test page with the subject information
    navigate(`/mcq-test`, {
      state: { 
        subjectId,
        subjectName
      }
    });
  };

  return (
    <>
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
                      <Button 
                        onClick={() => handleStartTest(subject.id, subject.name)}
                        className="w-full bg-primary hover:bg-primary-dark transition-colors"
                      >
                        بدء الاختبار
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default QCMList;
