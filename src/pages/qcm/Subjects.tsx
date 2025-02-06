
import QCMHeader from "@/components/qcm/QCMHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Subject } from "@/types/qcm";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <QCMHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-20">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">اختبارات حسب المادة</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Book className="w-8 h-8" />
                    <CardTitle>{subject.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {subject.participants} مشارك
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4" />
                      {subject.successRate}%
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
