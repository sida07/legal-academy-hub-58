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
      <div className="space-y-2">
        <label htmlFor="seoTitle" className="text-right block">
          عنوان SEO
        </label>
        <input
          id="seoTitle"
          value={seoTitle}
          onChange={(e) => onSEOTitleChange(e.target.value)}
          maxLength={60}
          className="w-full p-2 border rounded"
          placeholder="أدخل عنوان SEO (الحد الأقصى: 60 حرف)"
        />
        <div className="text-sm text-gray-500 text-right">
          {seoTitle.length}/60 حرف
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="metaDescription" className="text-right block">
          الوصف التعريفي
        </label>
        <textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          maxLength={160}
          className="w-full p-2 border rounded"
          placeholder="أدخل الوصف التعريفي (الحد الأقصى: 160 حرف)"
        />
        <div className="text-sm text-gray-500 text-right">
          {metaDescription.length}/160 حرف
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="keywords" className="text-right block">
          الكلمات المفتاحية
        </label>
        <input
          id="keywords"
          value={keywords}
          onChange={(e) => onKeywordsChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="أدخل الكلمات المفتاحية مفصولة بفواصل"
        />
      </div>
    </div>
  );
};