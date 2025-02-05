import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const questionSchema = z.object({
  text: z.string().min(1, "يجب إدخال نص السؤال"),
  option1: z.string().min(1, "يجب إدخال الخيار الأول"),
  option2: z.string().min(1, "يجب إدخال الخيار الثاني"),
  option3: z.string().min(1, "يجب إدخال الخيار الثالث"),
  correctAnswer: z.string().min(1, "يجب تحديد الإجابة الصحيحة"),
});

interface NewQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof questionSchema>) => void;
}

const NewQuestionDialog = ({ open, onOpenChange, onSubmit }: NewQuestionDialogProps) => {
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: "",
      option1: "",
      option2: "",
      option3: "",
      correctAnswer: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة سؤال جديد</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نص السؤال</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل نص السؤال" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الخيار الأول</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل الخيار الأول" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الخيار الثاني</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل الخيار الثاني" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الخيار الثالث</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل الخيار الثالث" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>الإجابة الصحيحة</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="1" id="option1" />
                        <Label htmlFor="option1">الخيار الأول</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="2" id="option2" />
                        <Label htmlFor="option2">الخيار الثاني</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="3" id="option3" />
                        <Label htmlFor="option3">الخيار الثالث</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewQuestionDialog;