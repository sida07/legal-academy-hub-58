import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ImageOptimizationProps {
  altText: string;
  onAltTextChange: (value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageOptimization = ({
  altText,
  onAltTextChange,
  onImageUpload,
}: ImageOptimizationProps) => {
  return (
    <div className="space-y-4">
      <FormItem>
        <FormLabel>الصورة المميزة</FormLabel>
        <FormControl>
          <Input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
          />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>النص البديل للصورة (Alt Text)</FormLabel>
        <FormControl>
          <Input
            value={altText}
            onChange={(e) => onAltTextChange(e.target.value)}
            placeholder="وصف مختصر للصورة يساعد محركات البحث"
          />
        </FormControl>
      </FormItem>
    </div>
  );
};