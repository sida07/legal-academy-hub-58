import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { BlogStats } from "@/components/blog/BlogStats";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { NewPostDialog } from "@/components/blog/NewPostDialog";
import { Post, NewPost } from "@/types/blog";

const BlogManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "مقدمة في القانون المدني",
      excerpt: "شرح مبسط لأساسيات القانون المدني وتطبيقاته في الحياة اليومية",
      content: "محتوى المقال الكامل هنا...",
      views: 1234,
      comments: 23,
      status: "published",
      date: "2024-03-15",
      seoTitle: "دليل شامل للقانون المدني | موقع القانون",
      metaDescription: "تعرف على أساسيات القانون المدني وتطبيقاته العملية في الحياة اليومية. دليل مبسط للمبتدئين.",
      keywords: "قانون مدني، حقوق، التزامات، عقود",
      altText: "صورة توضيحية لمفهوم القانون المدني",
    },
  ]);

  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    content: "",
    seoTitle: "",
    metaDescription: "",
    keywords: "",
    altText: "",
  });

  const handleNewPostChange = (field: keyof NewPost, value: string) => {
    setNewPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost((prev) => ({ ...prev, imageFile: file }));
    }
  };

  const handleNewPost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Convert File to URL if needed
    let imageUrl: string | undefined;
    if (newPost.imageFile) {
      imageUrl = URL.createObjectURL(newPost.imageFile);
    }

    const newPostData: Post = {
      id: posts.length + 1,
      title: newPost.title,
      excerpt: newPost.content.substring(0, 100) + "...",
      content: newPost.content,
      views: 0,
      comments: 0,
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      image: imageUrl,
      imageFile: newPost.imageFile,
      seoTitle: newPost.seoTitle,
      metaDescription: newPost.metaDescription,
      keywords: newPost.keywords,
      altText: newPost.altText,
    };

    setPosts([newPostData, ...posts]);
    setNewPost({
      title: "",
      content: "",
      seoTitle: "",
      metaDescription: "",
      keywords: "",
      altText: "",
    });
    setIsNewPostDialogOpen(false);

    toast({
      title: "تم الإضافة",
      description: "تم إضافة المقال بنجاح",
    });
  };

  const handleEditPost = (post: Post) => {
    // Edit functionality will be implemented in a separate component
    console.log("Edit post:", post);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف المقال بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">إدارة المدونة</h2>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsNewPostDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          مقال جديد
        </Button>
      </div>

      <BlogStats totalPosts={posts.length} />

      <Card>
        <BlogPostList
          posts={posts}
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePost}
        />
      </Card>

      <NewPostDialog
        isOpen={isNewPostDialogOpen}
        onOpenChange={setIsNewPostDialogOpen}
        newPost={newPost}
        onNewPostChange={handleNewPostChange}
        onImageUpload={handleImageUpload}
        onSubmit={handleNewPost}
      />
    </div>
  );
};

export default BlogManagement;