import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Subject } from "@/types/qcm";

interface SubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  subject?: Subject;
  onSave: (data: { name: string; questionCount?: string }) => void;
}

const SubjectDialog = ({
  open,
  onOpenChange,
  mode,
  subject,
  onSave,
}: SubjectDialogProps) => {
  const isEdit = mode === "edit";
  const [name, setName] = useState(subject?.name ?? "");
  const [questionCount, setQuestionCount] = useState(
    subject?.questionCount?.toString() ?? "50"
  );

  useEffect(() => {
    if (subject) {
      setName(subject.name);
      setQuestionCount(subject.questionCount.toString());
    }
  }, [subject]);

  const handleSave = () => {
    onSave({ 
      name,
      questionCount: isEdit ? undefined : questionCount
    });
    setName("");
    setQuestionCount("50");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "تعديل المادة" : "إضافة مادة جديدة"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subjectName">اسم المادة</Label>
            <Input
              id="subjectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم المادة"
            />
          </div>
          {!isEdit && (
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
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;