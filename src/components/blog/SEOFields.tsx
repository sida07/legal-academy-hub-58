import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SEOFieldsProps {
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  onSEOTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onKeywordsChange: (value: string) => void;
}

export const SEOFields = ({
  seoTitle,
  metaDescription,
  keywords,
  onSEOTitleChange,
  onMetaDescriptionChange,
  onKeywordsChange,
}: SEOFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormItem>
        <FormLabel>عنوان SEO (الحد الأقصى: 60 حرف)</FormLabel>
        <FormControl>
          <Input
            value={seoTitle}
            onChange={(e) => onSEOTitleChange(e.target.value)}
            maxLength={60}
            placeholder="عنوان مخصص لمحركات البحث"
          />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>الوصف التعريفي (الحد الأقصى: 160 حرف)</FormLabel>
        <FormControl>
          <Textarea
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            maxLength={160}
            placeholder="وصف مخصص يظهر في نتائج البحث"
          />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>الكلمات المفتاحية (مفصولة بفواصل)</FormLabel>
        <FormControl>
          <Input
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            placeholder="مثال: قانون، محاماة، استشارات قانونية"
          />
        </FormControl>
      </FormItem>
    </div>
  );
};