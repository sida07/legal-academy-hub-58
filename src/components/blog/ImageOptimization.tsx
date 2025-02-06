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
      <div className="space-y-2">
        <label htmlFor="image" className="text-right block">
          صورة المقال
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={onImageUpload}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="altText" className="text-right block">
          النص البديل للصورة
        </label>
        <input
          id="altText"
          value={altText}
          onChange={(e) => onAltTextChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="أدخل وصفاً للصورة يساعد في تحسين SEO"
        />
      </div>
    </div>
  );
};