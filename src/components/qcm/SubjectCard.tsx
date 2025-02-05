import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, BarChart, Eye, Pencil, Trash2 } from "lucide-react";
import { Subject } from "@/types/qcm";

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
  onViewQuestions: (subjectId: string) => void;
}

const SubjectCard = ({ subject, onEdit, onDelete, onViewQuestions }: SubjectCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
            onClick={() => onViewQuestions(subject.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            عرض الأسئلة
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(subject)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(subject)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;