
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuestionTable from "./QuestionTable";
import { Question } from "@/types/qcm";

interface QuestionsListProps {
  examYear: string;
  questions: Question[];
  onEditClick: (question: Question) => void;
  onDeleteClick: (question: Question) => void;
}

const QuestionsList = ({ examYear, questions, onEditClick, onDeleteClick }: QuestionsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الأسئلة المتوفرة في اختبار سنة {examYear}</CardTitle>
      </CardHeader>
      <CardContent>
        <QuestionTable
          questions={questions}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </CardContent>
    </Card>
  );
};

export default QuestionsList;
