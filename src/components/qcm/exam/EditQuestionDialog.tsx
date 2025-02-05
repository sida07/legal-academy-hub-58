import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Question } from "../../../types/qcm";

interface EditQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
  editedText: string;
  onEditTextChange: (text: string) => void;
  onConfirm: () => void;
}

const EditQuestionDialog = ({
  open,
  onOpenChange,
  editedText,
  onEditTextChange,
  onConfirm,
}: EditQuestionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل السؤال</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={editedText}
            onChange={(e) => onEditTextChange(e.target.value)}
            placeholder="أدخل نص السؤال الجديد"
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={onConfirm}>حفظ التغييرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;