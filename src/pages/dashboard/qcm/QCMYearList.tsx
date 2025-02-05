import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, BarChart, Eye, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface QCMYearListProps {
  category: "year1" | "year2";
}

const QCMYearList = ({ category }: QCMYearListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [examName, setExamName] = useState("");
  const [questionCount, setQuestionCount] = useState("50");
  const [duration, setDuration] = useState("60");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 46 }, (_, i) => 2000 + i).filter(
    (year) => year <= currentYear
  );

  const title = category === "year1" 
    ? "اختبارات المحاماة - السنة الأولى" 
    : "اختبارات المحاماة - السنة الثانية";

  const handleAddExam = () => {
    if (!examName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم الاختبار",
      });
      return;
    }

    // Here you would typically make an API call to save the exam
    console.log({
      name: examName,
      questionCount: parseInt(questionCount),
      duration: parseInt(duration),
    });

    toast({
      title: "تم إضافة الاختبار",
      description: "تم إضافة الاختبار بنجاح",
    });

    setIsDialogOpen(false);
    setExamName("");
    setQuestionCount("50");
    setDuration("60");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة اختبار جديد
        </Button>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة اختبار جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="examName">اسم الاختبار</Label>
              <Input
                id="examName"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="أدخل اسم الاختبار"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="questionCount">عدد الأسئلة</Label>
              <Input
                id="questionCount"
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">المدة الزمنية (بالدقائق)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddExam}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QCMYearList;