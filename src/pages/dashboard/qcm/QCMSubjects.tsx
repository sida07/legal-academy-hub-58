import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SubjectCard from "@/components/qcm/SubjectCard";
import SubjectDialog from "@/components/qcm/SubjectDialog";
import DeleteSubjectDialog from "@/components/qcm/DeleteSubjectDialog";
import { Subject } from "@/types/qcm";

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

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);

  const handleAddSubject = ({ name, questionCount }: { name: string; questionCount: string }) => {
    if (!name.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم المادة",
      });
      return;
    }

    const newSubject: Subject = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      questionCount: parseInt(questionCount || "50"),
      participants: 0,
      successRate: 0,
    };

    setSubjects([...subjects, newSubject]);
    toast({
      title: "تم إضافة المادة",
      description: "تم إضافة المادة بنجاح",
    });

    setIsAddDialogOpen(false);
  };

  const handleEditSubject = ({ name }: { name: string }) => {
    if (!name.trim() || !editingSubject) return;

    setSubjects(subjects.map(subject =>
      subject.id === editingSubject.id
        ? { ...subject, name }
        : subject
    ));

    toast({
      title: "تم التعديل",
      description: "تم تعديل اسم المادة بنجاح",
    });

    setIsEditDialogOpen(false);
    setEditingSubject(null);
  };

  const handleDeleteSubject = () => {
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
          <SubjectCard
            key={subject.id}
            subject={subject}
            onEdit={(subject) => {
              setEditingSubject(subject);
              setIsEditDialogOpen(true);
            }}
            onDelete={(subject) => {
              setDeletingSubject(subject);
              setIsDeleteDialogOpen(true);
            }}
            onViewQuestions={(subjectId) => 
              navigate(`/dashboard/qcm/exam/subject-${subjectId}`)
            }
          />
        ))}
      </div>

      <SubjectDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        mode="add"
        onSave={handleAddSubject}
      />

      <SubjectDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        subject={editingSubject ?? undefined}
        onSave={handleEditSubject}
      />

      <DeleteSubjectDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteSubject}
      />
    </div>
  );
};

export default QCMSubjects;