
import QCMHeader from "@/components/qcm/QCMHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Subject } from "@/types/qcm";
import { Scale, GalleryVertical, Building2, Landmark, Globe2, BookLock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Subjects = () => {
  const navigate = useNavigate();
  const [subjects] = useState<Subject[]>([
    { id: "civil", name: "القانون المدني", questionCount: 50, participants: 120, successRate: 75 },
    { id: "criminal", name: "القانون الجنائي", questionCount: 50, participants: 98, successRate: 68 },
    { id: "commercial", name: "القانون التجاري", questionCount: 50, participants: 85, successRate: 72 },
    { id: "administrative", name: "القانون الإداري", questionCount: 50, participants: 76, successRate: 70 },
    { id: "constitutional", name: "القانون الدستوري", questionCount: 50, participants: 92, successRate: 65 },
    { id: "international", name: "القانون الدولي", questionCount: 50, participants: 64, successRate: 78 },
  ]);

  const getSubjectIcon = (subjectId: string) => {
    switch (subjectId) {
      case "civil":
        return Scale;
      case "criminal":
        return BookLock;
      case "commercial":
        return Building2;
      case "administrative":
        return GalleryVertical;
      case "constitutional":
        return Landmark;
      case "international":
        return Globe2;
      default:
        return Scale;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <QCMHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-20">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-secondary">اختبارات حسب المادة</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const Icon = getSubjectIcon(subject.id);
              return (
                <Card 
                  key={subject.id} 
                  className="hover:shadow-lg transition-shadow duration-300 border-2 border-secondary/10"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-secondary">
                        {subject.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/5">
                        <span className="font-semibold text-lg text-secondary">
                          {subject.questionCount}
                        </span>
                        <span className="text-sm text-muted-foreground">سؤال</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/5">
                        <span className="font-semibold text-lg text-secondary">
                          {subject.participants}
                        </span>
                        <span className="text-sm text-muted-foreground">مشارك</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/5">
                        <span className="font-semibold text-lg text-secondary">
                          {subject.successRate}%
                        </span>
                        <span className="text-sm text-muted-foreground">نجاح</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => navigate(`/qcm/test/${subject.id}`)}
                    >
                      بدء الاختبار
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
