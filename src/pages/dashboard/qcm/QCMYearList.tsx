
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
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
import { supabase } from "@/integrations/supabase/client";

const QCMYearList = () => {
  const navigate = useNavigate();
  const { year } = useParams();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [examName, setExamName] = useState("");
  const [questionCount, setQuestionCount] = useState("50");
  const [duration, setDuration] = useState("60");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 46 }, (_, i) => 2000 + i).filter(
    (year) => year <= currentYear
  );

  const title = year === "year2" 
    ? "اختبارات المحاماة - السنة الثانية" 
    : "اختبارات المحاماة - السنة الأولى";

  const handleAddExam = async () => {
    if (!examName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم الاختبار",
      });
      return;
    }

    try {
      const { data: subject, error } = await supabase
        .from('subjects')
        .insert({
          name: examName,
          question_count: parseInt(questionCount),
          user_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "تم إضافة الاختبار",
        description: "تم إضافة الاختبار بنجاح",
      });

      setIsDialogOpen(false);
      setExamName("");
      setQuestionCount("50");
      setDuration("60");
    } catch (error) {
      console.error('Error adding exam:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الاختبار",
        variant: "destructive",
      });
    }
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
        {years.map((yearNum) => (
          <Card key={yearNum} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>اختبار سنة {yearNum}</CardTitle>
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
                onClick={() => navigate(`/dashboard/qcm/exam/${year}-${yearNum}`)}
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
