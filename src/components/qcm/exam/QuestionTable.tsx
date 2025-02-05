import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Question } from "../../../types/qcm";

interface QuestionTableProps {
  questions: Question[];
  onEditClick: (question: Question) => void;
  onDeleteClick: (question: Question) => void;
}

const QuestionTable = ({ questions, onEditClick, onDeleteClick }: QuestionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>السؤال</TableHead>
          <TableHead>عدد الخيارات</TableHead>
          <TableHead>الإجابة الصحيحة</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.id}>
            <TableCell className="font-medium">{question.text}</TableCell>
            <TableCell>{question.options.length}</TableCell>
            <TableCell>الخيار {question.correctAnswer + 1}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEditClick(question)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDeleteClick(question)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuestionTable;