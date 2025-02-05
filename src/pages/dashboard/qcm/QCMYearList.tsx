import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, BarChart, Eye } from "lucide-react";

interface QCMYearListProps {
  category: "year1" | "year2";
}

const QCMYearList = ({ category }: QCMYearListProps) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 46 }, (_, i) => 2000 + i).filter(
    (year) => year <= currentYear
  );

  const title = category === "year1" 
    ? "اختبارات المحاماة - السنة الأولى" 
    : "اختبارات المحاماة - السنة الثانية";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {years.map((year) => (
          <Card key={year} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>اختبار سنة {year}</CardTitle>
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
                onClick={() => navigate(`/dashboard/qcm/exam/${category}-${year}`)}
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

export default QCMYearList;