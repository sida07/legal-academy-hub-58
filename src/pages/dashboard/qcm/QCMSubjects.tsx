import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, BarChart, Eye } from "lucide-react";

const subjects = [
  { id: "civil", name: "القانون المدني" },
  { id: "criminal", name: "القانون الجنائي" },
  { id: "commercial", name: "القانون التجاري" },
  { id: "administrative", name: "القانون الإداري" },
  { id: "constitutional", name: "القانون الدستوري" },
  { id: "international", name: "القانون الدولي" },
];

const QCMSubjects = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">اختبارات حسب المادة</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  50 سؤال
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  0 مشارك
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4" />
                  0%
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => navigate(`/dashboard/qcm/exam/subject-${subject.id}`)}
              >
                <Eye className="w-4 h-4 mr-2" />
                عرض الأسئلة
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QCMSubjects;