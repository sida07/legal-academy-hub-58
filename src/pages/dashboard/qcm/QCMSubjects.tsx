import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, BarChart, Eye, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface Subject {
  id: string;
  name: string;
  questionCount: number;
  participants: number;
  successRate: number;
}

const QCMSubjects = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "civil", name: "القانون المدني", questionCount: 50, participants: 0, successRate: 0 },
    { id: "criminal", name: "القانون الجنائي", questionCount: 50, participants: 0, successRate: 0 },
    { id: "commercial", name: "القانون التجاري", questionCount: 50, participants: 0, successRate: 0 },
    { id: "administrative", name: "القانون الإداري", questionCount: 50, participants: 0, successRate: 0 },
    { id: "constitutional", name: "القانون الدستوري", questionCount: 50, participants: 0, successRate: 0 },
    { id: "international", name: "القانون الدولي", questionCount: 50, participants: 0, successRate: 0 },
  ]);

  // Add Subject Modal State
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [questionCount, setQuestionCount] = useState("50");

  // Edit Subject Modal State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editedName, setEditedName] = useState("");

  // Delete Subject Modal State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);

  const handleAddSubject = () => {
    if (!newSubjectName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم المادة",
      });
      return;
    }

    const newSubject: Subject = {
      id: newSubjectName.toLowerCase().replace(/\s+/g, '-'),
      name: newSubjectName,
      questionCount: parseInt(questionCount),
      participants: 0,
      successRate: 0,
    };

    setSubjects([...subjects, newSubject]);
    toast({
      title: "تم إضافة المادة",
      description: "تم إضافة المادة بنجاح",
    });

    setIsAddDialogOpen(false);
    setNewSubjectName("");
    setQuestionCount("50");
  };

  const handleEditClick = (subject: Subject) => {
    setEditingSubject(subject);
    setEditedName(subject.name);
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    if (!editedName.trim() || !editingSubject) return;

    setSubjects(subjects.map(subject =>
      subject.id === editingSubject.id
        ? { ...subject, name: editedName }
        : subject
    ));

    toast({
      title: "تم التعديل",
      description: "تم تعديل اسم المادة بنجاح",
    });

    setIsEditDialogOpen(false);
    setEditingSubject(null);
    setEditedName("");
  };

  const handleDeleteClick = (subject: Subject) => {
    setDeletingSubject(subject);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingSubject) return;

    setSubjects(subjects.filter(subject => subject.id !== deletingSubject.id));
    toast({
      title: "تم الحذف",
      description: "تم حذف المادة بنجاح",
    });

    setIsDeleteDialogOpen(false);
    setDeletingSubject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">اختبارات حسب المادة</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة مادة جديدة
        </Button>
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
                  {subject.questionCount} سؤال
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {subject.participants} مشارك
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4" />
                  {subject.successRate}%
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => navigate(`/dashboard/qcm/exam/subject-${subject.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  عرض الأسئلة
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditClick(subject)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteClick(subject)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Subject Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة مادة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subjectName">اسم المادة</Label>
              <Input
                id="subjectName"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="أدخل اسم المادة"
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddSubject}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل المادة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">اسم المادة</Label>
              <Input
                id="editName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="أدخل اسم المادة"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditConfirm}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذه المادة؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QCMSubjects;