import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SEOFields } from "./SEOFields";
import { ImageOptimization } from "./ImageOptimization";
import { NewPost } from "@/types/blog";

interface NewPostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newPost: NewPost;
  onNewPostChange: (field: keyof NewPost, value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const NewPostDialog = ({
  isOpen,
  onOpenChange,
  newPost,
  onNewPostChange,
  onImageUpload,
  onSubmit,
}: NewPostDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>إضافة مقال جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-right block">
                عنوان المقال
              </label>
              <Input
                id="title"
                value={newPost.title}
                onChange={(e) => onNewPostChange("title", e.target.value)}
                placeholder="أدخل عنوان المقال"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-right block">
                محتوى المقال
              </label>
              <Textarea
                id="content"
                value={newPost.content}
                onChange={(e) => onNewPostChange("content", e.target.value)}
                placeholder="أدخل محتوى المقال"
                className="min-h-[200px]"
              />
            </div>
          </div>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">تحسين محركات البحث (SEO)</h3>
            <SEOFields
              seoTitle={newPost.seoTitle}
              metaDescription={newPost.metaDescription}
              keywords={newPost.keywords}
              onSEOTitleChange={(value) => onNewPostChange("seoTitle", value)}
              onMetaDescriptionChange={(value) => onNewPostChange("metaDescription", value)}
              onKeywordsChange={(value) => onNewPostChange("keywords", value)}
            />
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">تحسين الصور</h3>
            <ImageOptimization
              altText={newPost.altText}
              onAltTextChange={(value) => onNewPostChange("altText", value)}
              onImageUpload={onImageUpload}
            />
          </Card>

          <Button onClick={onSubmit} className="w-full">
            نشر المقال
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};